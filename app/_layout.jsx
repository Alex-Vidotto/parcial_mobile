import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from '../context/UserContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { CartProvider } from '../context/CartContext';

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <UserProvider>
                <FavoritesProvider>
                    <CartProvider>
                        <Stack>
                            <Stack.Screen
                                name="(tabs)"
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="producto/[id]"
                                options={{ headerShown: false }}
                            />
                        </Stack>
                    </CartProvider>
                </FavoritesProvider>
            </UserProvider>
        </GestureHandlerRootView>
    );
}
