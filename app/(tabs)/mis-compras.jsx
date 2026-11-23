import { useContext, useCallback, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    RefreshControl,
    Text,
    View
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { CartContext } from '../../context/CartContext';
import { colors } from '../../style/theme';
import { styles } from '../../style/misCompras.styles';

export default function MisCompras() {
    const {
        pedidos,
        cargandoCarrito,
        errorPedidos,
        recargarPedidos
    } = useContext(CartContext);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            recargarPedidos();
        }, [recargarPedidos])
    );

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await recargarPedidos();
        setRefreshing(false);
    }, [recargarPedidos]);

    if (cargandoCarrito && pedidos.length === 0) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={colors.violet} />
                <Text style={styles.stateText}>Cargando tus compras...</Text>
            </View>
        );
    }

    if (errorPedidos && pedidos.length === 0) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>⚠️ {errorPedidos}</Text>
                <Pressable
                    style={({ pressed }) => [
                        styles.retryButton,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={recargarPedidos}
                >
                    <Text style={styles.retryButtonText}>Reintentar</Text>
                </Pressable>
            </View>
        );
    }

    const renderOrder = ({ item }) => {
        const productos = Array.isArray(item.productos) ? item.productos : [];

        return (
            <View style={styles.orderCard}>
                <View style={styles.orderHeader}>
                    <Text style={styles.orderId}>{item.id}</Text>
                    <Text style={styles.orderDate}>
                        {item.fecha} · {item.hora}
                    </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.productsContainer}>
                    {productos.map((prod, index) => (
                        <View
                            key={`${item.id}-${prod.id}-${index}`}
                            style={styles.productRow}
                        >
                            <View style={styles.productInfo}>
                                <Text style={styles.productName} numberOfLines={1}>
                                    {prod.nombre}
                                </Text>
                                <Text style={styles.productMeta}>
                                    Cantidad: {prod.cantidad} · $ {Number(prod.precioUnitario || 0).toLocaleString('es-AR')} c/u
                                </Text>
                            </View>
                            <Text style={styles.productSubtotal}>
                                $ {Number(prod.subtotal || 0).toLocaleString('es-AR')}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.divider} />

                <View style={styles.orderFooter}>
                    <Text style={styles.totalLabel}>Total pagado:</Text>
                    <Text style={styles.totalPrice}>
                        $ {Number(item.total || 0).toLocaleString('es-AR')}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.subHeader}>HISTORIAL</Text>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Mis Compras</Text>
                    <Text style={styles.itemCount}>
                        {pedidos.length} {pedidos.length === 1 ? 'pedido' : 'pedidos'}
                    </Text>
                </View>
            </View>

            {errorPedidos ? (
                <View style={styles.errorBanner}>
                    <Text style={styles.errorBannerText}>⚠️ {errorPedidos}</Text>
                    <Pressable onPress={recargarPedidos}>
                        <Text style={styles.errorBannerRetry}>Reintentar</Text>
                    </Pressable>
                </View>
            ) : null}

            <FlatList
                data={pedidos}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderOrder}
                contentContainerStyle={[
                    styles.list,
                    pedidos.length === 0 && styles.emptyList
                ]}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.violet, colors.purple]}
                        tintColor={colors.violet}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>📦</Text>
                        <Text style={styles.emptyTitle}>Todavía no realizaste compras</Text>
                        <Text style={styles.emptySubtitle}>
                            Cuando confirmes un pedido, podrás consultar tu historial aquí.
                        </Text>
                    </View>
                }
            />
        </View>
    );
}
