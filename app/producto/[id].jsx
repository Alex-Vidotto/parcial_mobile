import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Image, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { products } from '../../data/products';
import { styles } from './styles';
import { colors } from '../../theme';

export default function ProductDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const producto = products.find(
        (item) => item.id === Number(id)
    );

    if (!producto) {
        return (
            <View style={styles.center}>
                <Text style={styles.name}>
                    Producto no encontrado
                </Text>
                <View style={styles.buttonContainer}>
                    <Button title="Volver" color={colors.violet}
                        onPress={() => router.back()} />
                </View>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                {
                    paddingTop: insets.top + 28,
                    paddingBottom: insets.bottom + 24
                }
            ]}>
            <Image
                source={producto.imagen}
                style={styles.image}
            />
            <Text style={styles.name}>
                {producto.nombre}
            </Text>
            <Text style={styles.price}>
                $ {producto.precio}
            </Text>
            <Text style={styles.category}>
                {producto.categoria}
            </Text>
            <Text style={styles.description}>
                {producto.descripcion}
            </Text>
            <View style={styles.buttonContainer}>
                <Button title="Volver" color={colors.violet}
                    onPress={() => router.back()} />
            </View>
        </ScrollView>
    );
}
