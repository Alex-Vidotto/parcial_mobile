import { useContext } from 'react';
import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';
import { styles } from '../style/productCard.styles';

export default function ProductCard(props) {
    const { id } = props;
    const router = useRouter();
    const { esFavorito, toggleFavorito } = useContext(FavoritesContext);

    const nombre = props.nombre || props.title || 'Producto';
    const precio = props.precio || props.price || 0;
    const categoria = props.categoria || props.category || 'General';
    const imagen = props.imagen || (props.productImg ? { uri: props.productImg } : null) || (props.image ? { uri: props.image } : null);

    const imageSource = typeof imagen === 'string'
        ? { uri: imagen }
        : (imagen?.uri ? imagen : imagen || { uri: 'https://picsum.photos/400/400' });

    const isFav = esFavorito(id);

    function abrirDetalle() {
        router.push({
            pathname: '/producto/[id]',
            params: {
                id: String(id),
                nombre,
                precio: String(precio),
                categoria,
                imagenUri: imageSource?.uri || '',
                descripcion: props.descripcion || props.description || ''
            }
        });
    }

    return (
        <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={abrirDetalle}
        >
            <Image source={imageSource} style={styles.image} resizeMode="cover" />
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{nombre}</Text>
                <Text style={styles.price}>
                    $ {typeof precio === 'number' ? precio.toLocaleString('es-AR') : precio}
                </Text>
                <Text style={styles.category}>{categoria}</Text>
            </View>
            <Pressable
                style={styles.favButton}
                onPress={(e) => {
                    e.stopPropagation?.();
                    toggleFavorito({
                        id,
                        nombre,
                        precio,
                        categoria,
                        imagen: imageSource,
                        descripcion: props.descripcion || props.description || ''
                    });
                }}
                hitSlop={12}
            >
                <Text style={[styles.starText, isFav && styles.starActive]}>
                    {isFav ? '★' : '☆'}
                </Text>
            </Pressable>
        </Pressable>
    );
}
