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
        paddingBottom: 24,
        gap: 12
    },
    emptyList: {
        flexGrow: 1
    },
    orderCard: {
        backgroundColor: colors.surface,
        borderRadius: 14,
        padding: 14,
        gap: 10
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8
    },
    orderId: {
        fontSize: 13,
        fontWeight: '800',
        color: colors.purple,
        flexShrink: 1
    },
    orderDate: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.muted
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(107, 61, 134, 0.15)'
    },
    productsContainer: {
        gap: 8
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10
    },
    productInfo: {
        flex: 1
    },
    productName: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.text
    },
    productMeta: {
        fontSize: 13,
        color: colors.muted,
        marginTop: 2
    },
    productSubtotal: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.violet
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 2
    },
    totalLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.text
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.purple
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
    },
    stateText: {
        marginTop: 12,
        fontSize: 16,
        color: colors.muted
    },
    errorText: {
        fontSize: 16,
        color: '#D32F2F',
        textAlign: 'center',
        marginBottom: 16
    },
    errorBanner: {
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 12,
        borderRadius: 10,
        backgroundColor: colors.surface,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8
    },
    errorBannerText: {
        flex: 1,
        fontSize: 13,
        color: '#D32F2F',
        fontWeight: '600'
    },
    errorBannerRetry: {
        fontSize: 13,
        color: colors.purple,
        fontWeight: '800'
    },
    retryButton: {
        backgroundColor: colors.purple,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10
    },
    retryButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600'
    },
    buttonPressed: {
        opacity: 0.8
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 60
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
