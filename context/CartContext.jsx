import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const CartContext = createContext(null);

const CART_KEY = '@tienda:cart';
const PURCHASES_KEY = '@tienda:compras';

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [compras, setCompras] = useState({});
    const [cargandoCarrito, setCargandoCarrito] = useState(true);

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
                setCargandoCarrito(false);
            }
        }
        load();
    }, []);

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

    const finalizarCompra = async () => {
        const nuevasCompras = { ...compras };
        cartItems.forEach((item) => {
            const idStr = String(item.id);
            nuevasCompras[idStr] = (nuevasCompras[idStr] || 0) + (item.cantidad || 1);
        });

        setCompras(nuevasCompras);
        try {
            await AsyncStorage.setItem(PURCHASES_KEY, JSON.stringify(nuevasCompras));
        } catch (error) {
            console.error('Error al guardar compras', error);
        }

        await commitCart([]);
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
                cargandoCarrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                actualizarCantidad,
                vaciarCarrito,
                finalizarCompra,
                obtenerVecesComprado,
                total,
                cantidadTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
