import { FlatList, StyleSheet, Text, View } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/products';
import { colors } from '../../theme';

export default function Products() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Catálogo</Text>

            <FlatList
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <ProductCard
                    {...item} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colors.background,
        paddingTop: 40
    },

    title: {
        fontSize: 30, fontWeight: '700',
        paddingHorizontal: 16,
        color: colors.text
    },
    list: { padding: 16, gap: 12 }
});