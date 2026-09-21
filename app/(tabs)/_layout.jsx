import { Tabs } from 'expo-router';
import { colors } from '../../theme';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.violet,
      tabBarInactiveTintColor: colors.muted,
      tabBarStyle: { backgroundColor: colors.white },
      tabBarLabelStyle: { fontWeight: '600' }
    }}>

      <Tabs.Screen name="index"
        options={{
          title: 'Catálogo',
          tabBarLabel: 'Catálogo'
        }} />

      <Tabs.Screen name="favoritos"
        options={{
          title: 'Favoritos',
          tabBarLabel: 'Favoritos'
        }} />

      <Tabs.Screen name="perfil"
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil'
        }} />
    </Tabs>
  );
}