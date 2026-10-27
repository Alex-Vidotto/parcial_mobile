import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const FavoritesContext = createContext(null);

const KEY = 'favoritos';

export function FavoritesProvider({ children }) {
    const [favoritos, setFavoritos] = useState([]);
    const [cargandoFavoritos, setCargandoFavoritos] = useState(true);

    useEffect(() => {
        async function cargarFavoritos() {
            try {
                const datos = await AsyncStorage.getItem(KEY);
                if (datos) {
                    setFavoritos(JSON.parse(datos));
                }
            } catch (error) {
                console.error('Error cargando favoritos', error);
            } finally {
                setCargandoFavoritos(false);
            }
        }
        cargarFavoritos();
    }, []);

    const commit = async (next) => {
        const previous = favoritos;
        setFavoritos(next);
        try {
            await AsyncStorage.setItem(KEY, JSON.stringify(next));
        } catch (error) {
            setFavoritos(previous);
            Alert.alert('No se guardó', 'Volvé a intentar.');
        }
    };

    const esFavorito = (id) => {
        return favoritos.some((item) => String(item.id) === String(id));
    };

    const toggleFavorito = (producto) => {
        const existe = esFavorito(producto.id);
        const nombre = producto.nombre || producto.title || 'Producto';

        if (existe) {
            const actualizados = favoritos.filter(
                (item) => String(item.id) !== String(producto.id)
            );
            commit(actualizados);
            Alert.alert('Favoritos', `"${nombre}" eliminado de favoritos`);
        } else {
            const actualizados = [...favoritos, producto];
            commit(actualizados);
            Alert.alert('Favoritos', `"${nombre}" agregado a favoritos`);
        }
    };

    const eliminarFavorito = (id) => {
        const actualizados = favoritos.filter(
            (item) => String(item.id) !== String(id)
        );
        commit(actualizados);
    };

    const reordenarFavoritos = (nuevoArray) => {
        commit(nuevoArray);
    };

    return (
        <FavoritesContext.Provider
            value={{
                favoritos,
                cargandoFavoritos,
                esFavorito,
                toggleFavorito,
                eliminarFavorito,
                reordenarFavoritos,
                commit
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}
