import { useState, useEffect, useCallback } from 'react';
import {
    ActivityIndicator,
    FlatList,
    ImageBackground,
    Pressable,
    RefreshControl,
    Text,
    View
} from 'react-native';
import ProductCard from '../../components/ProductCard';
import { colors } from '../../style/theme';
import { styles } from '../../style/products.styles';

const API_URL = 'https://6adb977a3b7e90b82090153d.mockapi.io/api/v1/articulos';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const cargarProductos = async (isInitial = false) => {
        if (isInitial) {
            setLoading(true);
        }
        setError(null);

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`Error en el servidor: ${response.status}`);
            }

            const data = await response.json();

            const formatted = data.map((item) => {
                const imgRaw = item.imagen || item.productImg || item.image || item.avatar;
                return {
                    id: item.id,
                    nombre: item.nombre || item.name || item.title || 'Producto',
                    precio: item.precio || item.price || 0,
                    categoria: item.categoria || item.category || 'General',
                    descripcion: item.descripcion || item.description || '',
                    imagen: typeof imgRaw === 'string'
                        ? { uri: imgRaw }
                        : (imgRaw?.uri ? imgRaw : { uri: 'https://picsum.photos/400/400' })
                };
            });

            setProducts(formatted);
        } catch (err) {
            setError(err.message || 'No se pudieron cargar los productos');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        cargarProductos(true);
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        cargarProductos(false);
    }, []);

    if (loading && products.length === 0) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={colors.violet} />
                <Text style={styles.stateText}>Cargando catálogo...</Text>
            </View>
        );
    }

    if (error && products.length === 0) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
                <Pressable
                    style={({ pressed }) => [
                        styles.retryButton,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={() => cargarProductos(true)}
                >
                    <Text style={styles.retryButtonText}>Reintentar</Text>
                </Pressable>
            </View>
        );
    }

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <Text style={styles.subHeader}>MI TIENDA</Text>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Catálogo</Text>
                    <Text style={styles.itemCount}>{products.length} artículos</Text>
                </View>
            </View>

            <ImageBackground
                source={require('../../assets/hero.jpg')}
                style={styles.hero}
                imageStyle={{ borderRadius: 16 }}
            >
                <View style={styles.heroOverlay}>
                    <Text style={styles.heroTitle}>Elegí tu próximo favorito</Text>
                    <Text style={styles.heroSubtitle}>Diseño simple. Productos útiles.</Text>
                </View>
            </ImageBackground>

            <Text style={styles.sectionTitle}>Destacados</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <ProductCard {...item} />}
                contentContainerStyle={styles.list}
                ListHeaderComponent={renderHeader}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.violet, colors.purple]}
                        tintColor={colors.violet}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text style={styles.stateText}>No hay productos disponibles</Text>
                    </View>
                }
            />
        </View>
    );
}
