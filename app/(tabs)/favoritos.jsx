import { useContext } from 'react';
import {
    Alert,
    Image,
    Pressable,
    Text,
    View
} from 'react-native';
import { useRouter } from 'expo-router';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { FavoritesContext } from '../../context/FavoritesContext';
import { styles } from '../../style/favoritos.styles';

function SwipeRow({ children, onDelete }) {
    return (
        <Swipeable
            renderRightActions={() => (
                <Pressable
                    onPress={onDelete}
                    style={styles.deleteAction}
                >
                    <Text style={styles.deleteText}>Eliminar</Text>
                </Pressable>
            )}
        >
            {children}
        </Swipeable>
    );
}

export default function Favoritos() {
    const router = useRouter();
    const {
        favoritos,
        eliminarFavorito,
        reordenarFavoritos
    } = useContext(FavoritesContext);

    const abrirDetalle = (item) => {
        const nombre = item.nombre || item.title || 'Producto';
        const precio = item.precio || item.price || 0;
        const categoria = item.categoria || item.category || 'General';
        const imagenSource = typeof item.imagen === 'string'
            ? item.imagen
            : (item.imagen?.uri ? item.imagen.uri : '');

        router.push({
            pathname: '/producto/[id]',
            params: {
                id: String(item.id),
                nombre,
                precio: String(precio),
                categoria,
                imagenUri: imagenSource,
                descripcion: item.descripcion || item.description || ''
            }
        });
    };

    const confirmDelete = (id, nombre) => {
        Alert.alert(
            'Eliminar favorito',
            `¿Querés quitar "${nombre}" de tus favoritos?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => eliminarFavorito(id)
                }
            ]
        );
    };

    const renderDraggableItem = ({ item, drag, isActive }) => {
        const nombre = item.nombre || item.title || 'Producto';
        const precio = item.precio || item.price || 0;
        const categoria = item.categoria || item.category || 'General';
        const imagenSource = typeof item.imagen === 'string'
            ? { uri: item.imagen }
            : (item.imagen?.uri ? item.imagen : item.imagen || { uri: 'https://picsum.photos/300/300' });

        return (
            <View
                style={[
                    styles.cardContainer,
                    isActive && styles.activeCard
                ]}
            >
                <View style={styles.swipeArea}>
                    <SwipeRow onDelete={() => confirmDelete(item.id, nombre)}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.productRow,
                                pressed && { opacity: 0.85 }
                            ]}
                            onPress={() => abrirDetalle(item)}
                        >
                            <Image
                                source={imagenSource}
                                style={styles.thumbnail}
                                resizeMode="cover"
                            />
                            <View style={styles.info}>
                                <Text style={styles.name} numberOfLines={1}>
                                    {nombre}
                                </Text>
                                <Text style={styles.price}>
                                    $ {typeof precio === 'number' ? precio.toLocaleString('es-AR') : precio}
                                </Text>
                                <Text style={styles.category}>{categoria}</Text>
                            </View>
                        </Pressable>
                    </SwipeRow>
                </View>

                <Pressable
                    onLongPress={drag}
                    delayLongPress={350}
                    disabled={isActive}
                    style={({ pressed }) => [
                        styles.dragHandle,
                        pressed && styles.dragHandlePressed
                    ]}
                >
                    <Text style={styles.dragIcon}>≡</Text>
                    <Text style={styles.dragText}>MOVER</Text>
                </Pressable>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.subHeader}>GUARDADOS</Text>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Favoritos</Text>
                    <Text style={styles.itemCount}>
                        {favoritos.length} {favoritos.length === 1 ? 'artículo' : 'artículos'}
                    </Text>
                </View>
            </View>

            <View style={styles.hintBar}>
                <Text style={styles.hintText}>
                    👈 Deslizá para eliminar  ·  ≡ Mantené para reordenar
                </Text>
            </View>

            <DraggableFlatList
                data={favoritos}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderDraggableItem}
                onDragEnd={({ data }) => reordenarFavoritos(data)}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>⭐</Text>
                        <Text style={styles.emptyTitle}>No tenés productos favoritos todavía.</Text>
                        <Text style={styles.emptySubtitle}>
                            Tocá la estrella en el catálogo para agregarlos aquí.
                        </Text>
                    </View>
                }
            />
        </View>
    );
}
