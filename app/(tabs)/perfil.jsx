import { useContext } from 'react';
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    Text,
    View
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../../context/UserContext';
import { styles } from '../../style/perfil.styles';

export default function Perfil() {
    const { user, changePhoto, logout } = useContext(UserContext);

    const avisarPermiso = (recurso) => {
        Alert.alert(
            'Permiso requerido',
            `Se necesita autorización para acceder a ${recurso}. Podés habilitarlo desde Ajustes del dispositivo.`
        );
    };

    const elegirFoto = async () => {
        try {
            const resultado = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                quality: 0.8,
                allowsEditing: true,
                aspect: [1, 1]
            });

            if (resultado.canceled) return;

            if (resultado.assets && resultado.assets[0]?.uri) {
                changePhoto(resultado.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('No se pudo abrir la galería');
        }
    };

    const tomarFoto = async () => {
        try {
            const permiso = await ImagePicker.requestCameraPermissionsAsync();
            if (!permiso.granted) {
                return avisarPermiso('la cámara');
            }

            const resultado = await ImagePicker.launchCameraAsync({
                mediaTypes: ['images'],
                quality: 0.8,
                allowsEditing: true,
                aspect: [1, 1]
            });

            if (resultado.canceled) return;

            if (resultado.assets && resultado.assets[0]?.uri) {
                changePhoto(resultado.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('No se pudo abrir la cámara');
        }
    };

    const quitarFoto = () => {
        changePhoto(null);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.subHeader}>MI CUENTA</Text>
                <Text style={styles.title}>Perfil</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.avatarWrapper}>
                    {user?.avatarUri ? (
                        <Image
                            source={{ uri: user.avatarUri }}
                            style={styles.avatar}
                        />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarInitial}>
                                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                            </Text>
                        </View>
                    )}
                </View>
                <Text style={styles.userName}>{user?.name || 'Alex'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'alex@gmail.com'}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Foto de perfil</Text>
                <Text style={styles.cardDescription}>
                    Elegí una imagen de tu galería o capturá una nueva con la cámara del dispositivo.
                </Text>

                <Pressable
                    style={({ pressed }) => [
                        styles.primaryButton,
                        pressed && styles.pressed
                    ]}
                    onPress={elegirFoto}
                >
                    <Text style={styles.primaryButtonText}>🖼️  Elegir de la galería</Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        styles.secondaryButton,
                        pressed && styles.pressed
                    ]}
                    onPress={tomarFoto}
                >
                    <Text style={styles.secondaryButtonText}>📷  Tomar una fotografía</Text>
                </Pressable>

                {user?.avatarUri ? (
                    <Pressable
                        style={({ pressed }) => [
                            styles.dangerButton,
                            pressed && styles.pressed
                        ]}
                        onPress={quitarFoto}
                    >
                        <Text style={styles.dangerButtonText}>Quitar foto de perfil</Text>
                    </Pressable>
                ) : null}

                <Pressable
                    style={({ pressed }) => [
                        styles.logoutButton,
                        pressed && styles.pressed
                    ]}
                    onPress={() => {
                        Alert.alert(
                            'Cerrar sesión',
                            '¿Deseás salir de tu cuenta?',
                            [
                                { text: 'Cancelar', style: 'cancel' },
                                { text: 'Salir', style: 'destructive', onPress: logout }
                            ]
                        );
                    }}
                >
                    <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}
