import { useContext } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Pressable,
    Text,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../../context/CartContext';
import { styles } from '../../style/cart.styles';

export default function Carrito() {
    const {
        cartItems,
        actualizarCantidad,
        eliminarDelCarrito,
        finalizarCompra,
        total,
        cantidadTotal
    } = useContext(CartContext);

    const handleCheckout = () => {
        Alert.alert(
            'Finalizar compra',
            `¿Deseás confirmar tu compra por un total de $ ${total.toLocaleString('es-AR')}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        await finalizarCompra();
                        Alert.alert('¡Compra exitosa! 🎉', 'Tu pedido fue procesado con éxito.');
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }) => {
        const imagenSource = typeof item.imagen === 'string'
            ? { uri: item.imagen }
            : (item.imagen?.uri ? item.imagen : item.imagen || { uri: 'https://picsum.photos/300/300' });

        return (
            <View style={styles.cartCard}>
                <Image
                    source={imagenSource}
                    style={styles.thumbnail}
                    resizeMode="cover"
                />
                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={1}>{item.nombre}</Text>
                    <Text style={styles.price}>
                        $ {typeof item.precio === 'number' ? item.precio.toLocaleString('es-AR') : item.precio}
                    </Text>

                    <View style={styles.quantityRow}>
                        <Pressable
                            style={styles.qtyButton}
                            onPress={() => actualizarCantidad(item.id, -1)}
                        >
                            <Text style={styles.qtyButtonText}>-</Text>
                        </Pressable>
                        <Text style={styles.quantityText}>{item.cantidad}</Text>
                        <Pressable
                            style={styles.qtyButton}
                            onPress={() => actualizarCantidad(item.id, 1)}
                        >
                            <Text style={styles.qtyButtonText}>+</Text>
                        </Pressable>
                    </View>
                </View>

                <Pressable
                    style={styles.deleteButton}
                    onPress={() => eliminarDelCarrito(item.id)}
                    hitSlop={10}
                >
                    <Ionicons name="trash-outline" size={22} color="#D32F2F" />
                </Pressable>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.subHeader}>MI PEDIDO</Text>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Carrito</Text>
                    <Text style={styles.itemCount}>
                        {cantidadTotal} {cantidadTotal === 1 ? 'artículo' : 'artículos'}
                    </Text>
                </View>
            </View>

            <FlatList
                data={cartItems}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>🛒</Text>
                        <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
                        <Text style={styles.emptySubtitle}>
                            Explorá el catálogo y agregá los productos que desees comprar.
                        </Text>
                    </View>
                }
            />

            {cartItems.length > 0 && (
                <View style={styles.footer}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total a pagar:</Text>
                        <Text style={styles.totalPrice}>
                            $ {total.toLocaleString('es-AR')}
                        </Text>
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.checkoutButton,
                            pressed && styles.buttonPressed
                        ]}
                        onPress={handleCheckout}
                    >
                        <Text style={styles.checkoutButtonText}>Finalizar compra</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}
