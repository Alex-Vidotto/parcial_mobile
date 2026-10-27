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
        marginBottom: 10
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
    hintBar: {
        marginHorizontal: 16,
        marginBottom: 14,
        backgroundColor: colors.surface,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        alignItems: 'center'
    },
    hintText: {
        fontSize: 13,
        color: colors.purple,
        fontWeight: '600'
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 24,
        gap: 12
    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: 14,
        overflow: 'hidden',
        alignItems: 'stretch'
    },
    activeCard: {
        opacity: 0.85,
        transform: [{ scale: 1.02 }],
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 6
    },
    swipeArea: {
        flex: 1
    },
    productRow: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        padding: 10,
        alignItems: 'center'
    },
    thumbnail: {
        width: 70,
        height: 70,
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
    category: {
        fontSize: 12,
        color: colors.muted,
        marginTop: 2
    },
    deleteAction: {
        backgroundColor: '#B42336',
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        paddingHorizontal: 12
    },
    deleteText: {
        color: colors.white,
        fontWeight: '700',
        fontSize: 14
    },
    dragHandle: {
        width: 65,
        backgroundColor: 'rgba(107, 61, 134, 0.08)',
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(107, 61, 134, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4
    },
    dragHandlePressed: {
        backgroundColor: 'rgba(107, 61, 134, 0.2)'
    },
    dragIcon: {
        fontSize: 18,
        color: colors.purple,
        fontWeight: 'bold'
    },
    dragText: {
        fontSize: 11,
        fontWeight: '800',
        color: colors.purple,
        marginTop: 2,
        letterSpacing: 0.5
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        paddingHorizontal: 24
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 12
    },
    emptyTitle: {
        fontSize: 17,
        fontWeight: '700',
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
