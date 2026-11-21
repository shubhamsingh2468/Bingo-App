import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { colors } from '@/src/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.slate400,
        tabBarStyle: {
          height: 66,
          paddingTop: 7,
          paddingBottom: 8,
          borderTopColor: colors.slate200,
          backgroundColor: colors.white,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '900', letterSpacing: 0.8 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'GAMES',
          tabBarIcon: ({ focused }) => (
            <Text style={{ color: focused ? colors.blue : colors.slate400, fontSize: 17 }}>▦</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: 'RANKING',
          tabBarIcon: ({ focused }) => (
            <Text style={{ color: focused ? colors.blue : colors.slate400, fontSize: 17 }}>♛</Text>
          ),
        }}
      />
    </Tabs>
  );
}
