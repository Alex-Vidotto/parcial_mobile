import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background
    },
    container: {
        paddingHorizontal: 20,
        gap: 16
    },
    backButton: {
        alignSelf: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 4
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.violet
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface,
        borderRadius: 20,
        overflow: 'hidden',
        height: 280
    },
    image: {
        width: '100%',
        height: '100%'
    },
    info: {
        gap: 12
    },
    category: {
        fontSize: 13,
        fontWeight: '800',
        color: colors.violet,
        letterSpacing: 1
    },
    name: {
        fontSize: 26,
        fontWeight: '800',
        color: colors.text
    },
    price: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.violet
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: colors.text,
        marginTop: 4
    },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: colors.surface,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginVertical: 4
    },
    badgeText: {
        fontSize: 14,
        color: colors.purple,
        fontWeight: '500'
    },
    badgeNumber: {
        fontWeight: '800'
    },
    favButton: {
        borderWidth: 1.5,
        borderColor: colors.violet,
        backgroundColor: colors.white,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 6
    },
    favButtonActive: {
        backgroundColor: colors.surface,
        borderColor: colors.purple
    },
    favButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.violet
    },
    favButtonTextActive: {
        color: colors.purple
    },
    buyButton: {
        backgroundColor: colors.purple,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center'
    },
    buyButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.white
    },
    buyNowButton: {
        backgroundColor: colors.violet,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center'
    },
    buyNowButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.white
    },
    buttonDisabled: {
        opacity: 0.6
    },
    pressed: {
        opacity: 0.8
    }
});
