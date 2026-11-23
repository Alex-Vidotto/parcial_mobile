import { useContext } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    Text,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { products as localProducts } from '../../data/products';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext } from '../../context/CartContext';
import { styles } from '../../style/productDetail.styles';

export default function ProductDetail() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { esFavorito, toggleFavorito } = useContext(FavoritesContext);
    const {
        agregarAlCarrito,
        comprarProducto,
        obtenerVecesComprado,
        procesandoCompra
    } = useContext(CartContext);

    const local = localProducts.find((item) => String(item.id) === String(params.id));

    const id = params.id;
    const nombre = params.nombre || local?.nombre || 'Producto';
    const precio = params.precio || local?.precio || '0';
    const categoria = params.categoria || local?.categoria || 'General';
    const descripcion = params.descripcion || local?.descripcion || 'Sin descripción disponible.';

    const imagenSource = params.imagenUri
        ? { uri: params.imagenUri }
        : (local?.imagen || { uri: 'https://picsum.photos/600/600' });

    const isFav = esFavorito(id);
    const vecesComprado = obtenerVecesComprado(id);

    const handleAddToCart = () => {
        agregarAlCarrito({
            id,
            nombre,
            precio,
            categoria,
            imagen: imagenSource,
            descripcion
        });
    };

    const handleBuyNow = () => {
        if (procesandoCompra) return;

        const rawPrecio = Number(precio || 0);
        const precioNum = Number.isNaN(rawPrecio) ? 0 : rawPrecio;

        Alert.alert(
            'Confirmar compra',
            `¿Deseás comprar "${nombre}" por $ ${precioNum.toLocaleString('es-AR')}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        const resultado = await comprarProducto(
                            {
                                id,
                                nombre,
                                precio: precioNum,
                                categoria,
                                imagen: imagenSource,
                                descripcion
                            },
                            1
                        );

                        if (resultado?.ok) {
                            Alert.alert('¡Compra exitosa! 🎉', 'Tu pedido fue registrado en Mis Compras.');
                        } else {
                            Alert.alert('Error', 'No se pudo registrar la compra. Intentá nuevamente.');
                        }
                    }
                }
            ]
        );
    };

    const handleToggleFavorite = () => {
        toggleFavorito({
            id,
            nombre,
            precio,
            categoria,
            imagen: imagenSource,
            descripcion
        });
    };

    return (
        <View style={styles.screen}>
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    {
                        paddingTop: insets.top + 16,
                        paddingBottom: insets.bottom + 40
                    }
                ]}
            >
                <Pressable
                    style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>← Volver</Text>
                </Pressable>

                <View style={styles.imageContainer}>
                    <Image
                        source={imagenSource}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.info}>
                    <Text style={styles.category}>{categoria.toUpperCase()}</Text>
                    <Text style={styles.name}>{nombre}</Text>
                    <Text style={styles.price}>
                        $ {typeof precio === 'number' ? precio.toLocaleString('es-AR') : precio}
                    </Text>
                    <Text style={styles.description}>{descripcion}</Text>

                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            Veces comprado: <Text style={styles.badgeNumber}>{vecesComprado}</Text>
                        </Text>
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.favButton,
                            isFav && styles.favButtonActive,
                            pressed && styles.pressed
                        ]}
                        onPress={handleToggleFavorite}
                    >
                        <Text style={[styles.favButtonText, isFav && styles.favButtonTextActive]}>
                            {isFav ? '★ En Favoritos' : '☆ Agregar a Favoritos'}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.buyButton,
                            pressed && styles.pressed
                        ]}
                        onPress={handleAddToCart}
                    >
                        <Text style={styles.buyButtonText}>🛒 Agregar al Carrito</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.buyNowButton,
                            pressed && styles.pressed,
                            procesandoCompra && styles.buttonDisabled
                        ]}
                        onPress={handleBuyNow}
                        disabled={procesandoCompra}
                    >
                        <Text style={styles.buyNowButtonText}>
                            {procesandoCompra ? 'Procesando...' : '⚡ Comprar ahora'}
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}
