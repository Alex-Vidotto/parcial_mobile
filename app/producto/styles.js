import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        gap: 14,
        backgroundColor: colors.background
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        backgroundColor: colors.background
    },
    buttonContainer: {
        alignSelf: 'center',
        width: 140
    },
    image: {
        width: '100%',
        height: 280,
        borderRadius: 16
    },
    name: { fontSize: 28, fontWeight: '700', color: colors.text },
    price: { fontSize: 24, fontWeight: '700', color: colors.violet },
    category: { fontSize: 17, color: colors.muted },
    description: { fontSize: 18, lineHeight: 26, color: colors.text }
});