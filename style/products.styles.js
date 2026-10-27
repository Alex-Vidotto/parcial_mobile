import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 36
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 24,
        gap: 12
    },
    headerContainer: {
        marginBottom: 8
    },
    header: {
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
    hero: {
        height: 160,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        justifyContent: 'flex-end'
    },
    heroOverlay: {
        backgroundColor: 'rgba(36, 21, 47, 0.55)',
        padding: 16,
        borderRadius: 16
    },
    heroTitle: {
        color: colors.white,
        fontSize: 22,
        fontWeight: '800'
    },
    heroSubtitle: {
        color: '#E8DDF2',
        fontSize: 14,
        marginTop: 4
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.text,
        marginTop: 6,
        marginBottom: 8
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
    retryButton: {
        backgroundColor: colors.purple,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10
    },
    buttonPressed: {
        opacity: 0.8
    },
    retryButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600'
    }
});
