import { useState, useContext } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    TextInput,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserContext';
import { colors } from '../style/theme';
import { styles } from '../style/login.styles';

export default function LoginScreen() {
    const { login } = useContext(UserContext);
    const [email, setEmail] = useState('alex@gmail.com');
    const [password, setPassword] = useState('123');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email.trim() || !password) {
            Alert.alert('Campos incompletos', 'Por favor ingresá tu correo y contraseña.');
            return;
        }

        setLoading(true);
        const result = await login(email, password);
        setLoading(false);

        if (!result.success) {
            Alert.alert('Inicio de sesión fallido', result.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.card}>
                <View style={styles.header}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="lock-closed" size={32} color={colors.white} />
                    </View>
                    <Text style={styles.title}>Iniciar Sesión</Text>
                    <Text style={styles.subtitle}>Ingresá con tus datos para continuar</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Correo electrónico</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="ejemplo@correo.com"
                            placeholderTextColor={colors.muted}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••"
                            placeholderTextColor={colors.muted}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            pressed && styles.buttonPressed,
                            loading && { opacity: 0.7 }
                        ]}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Ingresando...' : 'Ingresar a la Tienda'}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
