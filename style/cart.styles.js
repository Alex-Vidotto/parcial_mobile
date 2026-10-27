import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 36
    },
    header: {
        paddingHorizontal: 16,
        marginBottom: 14
    },
    subHeader: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.violet,
        letterSpacing: 1,
        textTransform: 'uppercase'
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: 4
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.text
    },
    itemCount: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.violet
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        gap: 12
    },
    cartCard: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: 14,
        padding: 10,
        alignItems: 'center'
    },
    thumbnail: {
        width: 75,
        height: 75,
        borderRadius: 10,
        backgroundColor: colors.background
    },
    info: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center'
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text
    },
    price: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.violet,
        marginTop: 4
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 8
    },
    qtyButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.violet
    },
    qtyButtonText: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.purple
    },
    quantityText: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.text,
        minWidth: 20,
        textAlign: 'center'
    },
    deleteButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        backgroundColor: colors.surface,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        gap: 14,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 6
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    totalLabel: {
        fontSize: 17,
        fontWeight: '700',
        color: colors.text
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.violet
    },
    checkoutButton: {
        backgroundColor: colors.purple,
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center'
    },
    checkoutButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '700'
    },
    buttonPressed: {
        opacity: 0.85
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 80
    },
    emptyIcon: {
        fontSize: 50,
        marginBottom: 12
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.text,
        textAlign: 'center'
    },
    emptySubtitle: {
        fontSize: 14,
        color: colors.muted,
        textAlign: 'center',
        marginTop: 6
    }
});
