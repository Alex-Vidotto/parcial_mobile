import { useContext } from 'react';
import { Tabs } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../style/theme';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import LoginScreen from '../../components/LoginScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
    const insets = useSafeAreaInsets();
    const { isLoggedIn, authLoading } = useContext(UserContext);
    const { favoritos } = useContext(FavoritesContext) || { favoritos: [] };
    const { cantidadTotal } = useContext(CartContext) || { cantidadTotal: 0 };

    if (authLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.purple} />
            </View>
        );
    }

    if (!isLoggedIn) {
        return <LoginScreen />;
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.violet,
                tabBarInactiveTintColor: colors.muted,
                tabBarStyle: {
                    backgroundColor: colors.white,
                    borderTopColor: colors.surface,
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: { fontWeight: '700', fontSize: 11 },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Catálogo',
                    tabBarLabel: 'Catálogo',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'grid' : 'grid-outline'}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name="favoritos"
                options={{
                    title: 'Favoritos',
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'star' : 'star-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                    tabBarBadge: favoritos && favoritos.length > 0 ? favoritos.length : undefined,
                    tabBarBadgeStyle: {
                        backgroundColor: colors.purple,
                        color: colors.white,
                        fontSize: 11
                    }
                }}
            />

            <Tabs.Screen
                name="carrito"
                options={{
                    title: 'Carrito',
                    tabBarLabel: 'Carrito',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'cart' : 'cart-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                    tabBarBadge: cantidadTotal > 0 ? cantidadTotal : undefined,
                    tabBarBadgeStyle: {
                        backgroundColor: colors.violet,
                        color: colors.white,
                        fontSize: 11
                    }
                }}
            />

            <Tabs.Screen
                name="mis-compras"
                options={{
                    title: 'Mis Compras',
                    tabBarLabel: 'Mis Compras',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'cube' : 'cube-outline'}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name="perfil"
                options={{
                    title: 'Perfil',
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Tabs>
    );
}
