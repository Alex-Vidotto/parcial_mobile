import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        padding: 24
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 24,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4
    },
    header: {
        alignItems: 'center',
        marginBottom: 24
    },
    iconCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.purple,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: colors.text
    },
    subtitle: {
        fontSize: 14,
        color: colors.muted,
        marginTop: 4
    },
    form: {
        gap: 16
    },
    inputGroup: {
        gap: 6
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.text
    },
    input: {
        backgroundColor: colors.white,
        borderWidth: 1.5,
        borderColor: colors.surface,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: colors.text
    },
    button: {
        backgroundColor: colors.purple,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 8
    },
    buttonPressed: {
        opacity: 0.8
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '700'
    },
    demoBox: {
        marginTop: 20,
        padding: 12,
        borderRadius: 10,
        backgroundColor: 'rgba(107, 61, 134, 0.08)',
        alignItems: 'center'
    },
    demoTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.purple,
        marginBottom: 2
    },
    demoText: {
        fontSize: 12,
        color: colors.muted,
        textAlign: 'center'
    }
});
