import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: 14,
        overflow: 'hidden',
        alignItems: 'center',
        padding: 8
    },
    cardPressed: {
        opacity: 0.9
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: colors.background
    },
    info: {
        flex: 1,
        paddingHorizontal: 12,
        justifyContent: 'center'
    },
    name: {
        fontSize: 17,
        fontWeight: '700',
        color: colors.text
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.violet,
        marginTop: 4
    },
    category: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 2
    },
    favButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    starText: {
        fontSize: 22,
        color: colors.muted
    },
    starActive: {
        color: '#E5A93C'
    }
});
