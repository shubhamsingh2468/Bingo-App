import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/src/constants/theme';

export function ScreenTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 16 },
  title: { color: colors.slate900, fontSize: 23, fontWeight: '900', letterSpacing: -0.5 },
  subtitle: { color: colors.slate500, marginTop: 4, fontSize: 12, fontWeight: '600' },
});
