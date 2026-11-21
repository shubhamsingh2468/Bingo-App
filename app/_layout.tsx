import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../global.css';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F8FAFC' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="card-selection/[stake]" />
      <Stack.Screen name="game-room" />
      <Stack.Screen name="winner" options={{ presentation: 'modal', animation: 'fade' }} />
    </Stack>
  );
}
