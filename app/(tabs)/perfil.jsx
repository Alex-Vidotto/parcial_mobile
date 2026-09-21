import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme';

export default function Perfil() {
    return <View
        style={styles.page}><Text>Perfil</Text></View>;
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background
    }
});