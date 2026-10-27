import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { validUsers } from '../data/users';

export const UserContext = createContext(null);

const PROFILE_KEY = '@tienda:profile';
const AUTH_KEY = '@tienda:isLoggedIn';

const defaultUser = {
    name: 'Alex',
    email: 'alex@gmail.com',
    avatarUri: null,
};

export function UserProvider({ children }) {
    const [user, setUser] = useState(defaultUser);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const storedAuth = await AsyncStorage.getItem(AUTH_KEY);
                if (storedAuth !== null) {
                    setIsLoggedIn(JSON.parse(storedAuth));
                }

                const raw = await AsyncStorage.getItem(PROFILE_KEY);
                if (raw) {
                    setUser(JSON.parse(raw));
                }
                setReady(true);
            } catch (e) {
                console.error('Error al leer datos de usuario', e);
            } finally {
                setAuthLoading(false);
            }
        }
        load();
    }, []);

    useEffect(() => {
        if (!ready) return;
        async function save() {
            try {
                await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(user));
            } catch (e) {
                Alert.alert('Error al guardar el perfil');
            }
        }
        save();
    }, [user, ready]);

    const login = async (email, password) => {
        const found = validUsers.find(
            (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase() && u.password === password
        );

        if (found) {
            setUser((prev) => ({
                ...prev,
                name: found.name,
                email: found.email
            }));
            setIsLoggedIn(true);
            await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(true));
            return { success: true };
        } else {
            return {
                success: false,
                message: 'Correo o contraseña incorrectos. Podés usar alex@gmail.com con clave 123'
            };
        }
    };

    const logout = async () => {
        setIsLoggedIn(false);
        await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(false));
    };

    const updateProfile = (patch) => {
        setUser((prev) => ({ ...prev, ...patch }));
    };

    const changePhoto = (avatarUri) => {
        updateProfile({ avatarUri });
    };

    return (
        <UserContext.Provider
            value={{
                user,
                isLoggedIn,
                authLoading,
                login,
                logout,
                updateProfile,
                changePhoto
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
