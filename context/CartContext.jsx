import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const CartContext = createContext(null);

const CART_KEY = '@tienda:cart';
const PURCHASES_KEY = '@tienda:compras';
const ORDERS_KEY = '@tienda:pedidos';

function ordenarPedidos(lista) {
    return [...lista].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
}

function armarPedido(items) {
    const ahora = new Date();
    const timestamp = ahora.getTime();
    const dia = String(ahora.getDate()).padStart(2, '0');
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const anio = ahora.getFullYear();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');

    const productos = items.map((item) => {
        const rawPrecio = Number(item.precio ?? item.price ?? 0);
        const precioUnitario = Number.isNaN(rawPrecio) ? 0 : rawPrecio;
        const cantidad = Number(item.cantidad) > 0 ? Number(item.cantidad) : 1;

        return {
            id: String(item.id),
            nombre: item.nombre || item.title || 'Producto',
            precioUnitario,
            cantidad,
            subtotal: precioUnitario * cantidad,
            imagen: typeof item.imagen === 'string' ? item.imagen : (item.imagen?.uri || '')
        };
    });

    const total = productos.reduce((acc, prod) => acc + prod.subtotal, 0);

    return {
        id: `PED-${timestamp}`,
        fecha: `${dia}/${mes}/${anio}`,
        hora: `${horas}:${minutos}`,
        timestamp,
        productos,
        total
    };
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [compras, setCompras] = useState({});
    const [pedidos, setPedidos] = useState([]);
    const [cargandoCarrito, setCargandoCarrito] = useState(true);
    const [errorPedidos, setErrorPedidos] = useState(null);
    const [procesandoCompra, setProcesandoCompra] = useState(false);
    const comprandoRef = useRef(false);

    const recargarPedidos = useCallback(async () => {
        try {
            setErrorPedidos(null);
            const storedOrders = await AsyncStorage.getItem(ORDERS_KEY);
            if (storedOrders) {
                const parsed = JSON.parse(storedOrders);
                setPedidos(Array.isArray(parsed) ? ordenarPedidos(parsed) : []);
            } else {
                setPedidos([]);
            }
        } catch (error) {
            console.error('Error al cargar pedidos', error);
            setErrorPedidos('No se pudo cargar el historial de compras.');
        }
    }, []);

    useEffect(() => {
        async function load() {
            try {
                const storedCart = await AsyncStorage.getItem(CART_KEY);
                if (storedCart) {
                    setCartItems(JSON.parse(storedCart));
                }

                const storedPurchases = await AsyncStorage.getItem(PURCHASES_KEY);
                if (storedPurchases) {
                    setCompras(JSON.parse(storedPurchases));
                }
            } catch (error) {
                console.error('Error al cargar datos del carrito', error);
            } finally {
                await recargarPedidos();
                setCargandoCarrito(false);
            }
        }
        load();
    }, [recargarPedidos]);

    const commitCart = async (next) => {
        const prev = cartItems;
        setCartItems(next);
        try {
            await AsyncStorage.setItem(CART_KEY, JSON.stringify(next));
        } catch (error) {
            setCartItems(prev);
            Alert.alert('Error', 'No se pudo guardar el carrito');
        }
    };

    const agregarAlCarrito = (producto) => {
        const nombre = producto.nombre || producto.title || 'Producto';
        const precio = Number(producto.precio || producto.price || 0);

        const index = cartItems.findIndex((it) => String(it.id) === String(producto.id));

        let actualizados;
        if (index > -1) {
            actualizados = [...cartItems];
            actualizados[index] = {
                ...actualizados[index],
                cantidad: (actualizados[index].cantidad || 1) + 1
            };
        } else {
            actualizados = [
                ...cartItems,
                {
                    ...producto,
                    precio,
                    cantidad: 1
                }
            ];
        }

        commitCart(actualizados);
        Alert.alert('Carrito', `"${nombre}" fue agregado al carrito.`);
    };

    const eliminarDelCarrito = (id) => {
        const actualizados = cartItems.filter((it) => String(it.id) !== String(id));
        commitCart(actualizados);
    };

    const actualizarCantidad = (id, delta) => {
        const actualizados = cartItems
            .map((it) => {
                if (String(it.id) === String(id)) {
                    const nuevaCantidad = (it.cantidad || 1) + delta;
                    return nuevaCantidad > 0 ? { ...it, cantidad: nuevaCantidad } : null;
                }
                return it;
            })
            .filter(Boolean);

        commitCart(actualizados);
    };

    const vaciarCarrito = () => {
        commitCart([]);
    };

    const registrarCompra = async (items, limpiarCarrito = false) => {
        if (comprandoRef.current || procesandoCompra || !items || items.length === 0) {
            return { ok: false };
        }

        comprandoRef.current = true;
        setProcesandoCompra(true);

        try {
            const nuevoPedido = armarPedido(items);
            const nuevosPedidos = ordenarPedidos([nuevoPedido, ...pedidos]);

            const nuevasCompras = { ...compras };
            items.forEach((item) => {
                const idStr = String(item.id);
                const cantidad = Number(item.cantidad) > 0 ? Number(item.cantidad) : 1;
                nuevasCompras[idStr] = (nuevasCompras[idStr] || 0) + cantidad;
            });

            await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(nuevosPedidos));
            await AsyncStorage.setItem(PURCHASES_KEY, JSON.stringify(nuevasCompras));

            setPedidos(nuevosPedidos);
            setCompras(nuevasCompras);
            setErrorPedidos(null);

            if (limpiarCarrito) {
                await AsyncStorage.setItem(CART_KEY, JSON.stringify([]));
                setCartItems([]);
            }

            return { ok: true, pedido: nuevoPedido };
        } catch (error) {
            console.error('Error al registrar la compra', error);
            return { ok: false, error };
        } finally {
            comprandoRef.current = false;
            setProcesandoCompra(false);
        }
    };

    const finalizarCompra = async () => {
        return await registrarCompra(cartItems, true);
    };

    const comprarProducto = async (producto, cantidad = 1) => {
        return await registrarCompra([{ ...producto, cantidad }], false);
    };

    const obtenerVecesComprado = (id) => {
        return compras[String(id)] || 0;
    };

    const total = cartItems.reduce(
        (acc, it) => acc + Number(it.precio || 0) * (it.cantidad || 1),
        0
    );

    const cantidadTotal = cartItems.reduce(
        (acc, it) => acc + (it.cantidad || 1),
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                pedidos,
                cargandoCarrito,
                errorPedidos,
                procesandoCompra,
                agregarAlCarrito,
                eliminarDelCarrito,
                actualizarCantidad,
                vaciarCarrito,
                finalizarCompra,
                comprarProducto,
                recargarPedidos,
                obtenerVecesComprado,
                total,
                cantidadTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
