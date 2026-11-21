import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { BingoCard } from '@/src/components/BingoCard';
import { colors } from '@/src/constants/theme';

export default function WinnerModalScreen() {
  const router = useRouter();
  const { card: cardParam, stake: stakeParam } = useLocalSearchParams<{ card: string; stake: string }>();
  const card = Number(cardParam) || 28;
  const prize = (Number(stakeParam) || 20) * 18;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View className="flex-1 justify-center px-5" style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.confetti}><Text style={styles.star}>✦</Text><Text style={styles.starSmall}>✦</Text><Text style={styles.star}>✧</Text></View>
          <View style={styles.medal}><Text style={styles.medalText}>🏆</Text></View>
          <Text style={styles.title}>BINGO!</Text>
          <Text style={styles.subtitle}>You have won the game</Text>
          <View style={styles.prizePill}><Text style={styles.prizeText}>+ {prize.toLocaleString()} ETB</Text></View>
          <View style={styles.winningBoard}>
            <Text style={styles.boardLabel}>BOARD NUMBER {card}</Text>
            <BingoCard cardNumber={card} winning />
          </View>
          <View style={styles.timerControl}>
            <Text style={styles.timerText}>RETURNING TO LOBBY IN　<Text style={styles.timerNumber}>10s</Text></Text>
          </View>
          <Pressable onPress={() => { router.dismissAll(); router.replace('/(tabs)'); }} style={styles.continueButton}>
            <Text style={styles.continueText}>CONTINUE　→</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B1D4B' },
  backdrop: { backgroundColor: 'rgba(11,29,75,0.96)' },
  card: { backgroundColor: colors.blueBright, borderRadius: 25, padding: 19, alignItems: 'center', overflow: 'hidden' },
  confetti: { position: 'absolute', top: 16, left: 18, right: 18, flexDirection: 'row', justifyContent: 'space-between' },
  star: { color: colors.amberLight, fontSize: 22, fontWeight: '900' },
  starSmall: { color: '#BFDBFE', fontSize: 16, marginTop: 18 },
  medal: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF33', marginTop: 7 },
  medalText: { fontSize: 27 },
  title: { color: colors.white, fontSize: 31, fontWeight: '900', marginTop: 8, letterSpacing: 1.5 },
  subtitle: { color: '#DBEAFE', fontSize: 13, fontWeight: '700', marginTop: 2 },
  prizePill: { backgroundColor: colors.amberLight, paddingHorizontal: 17, paddingVertical: 8, borderRadius: 20, marginTop: 12 },
  prizeText: { color: colors.slate900, fontSize: 13, fontWeight: '900', fontVariant: ['tabular-nums'] },
  winningBoard: { width: '100%', backgroundColor: colors.white, borderRadius: 16, padding: 9, marginTop: 15 },
  boardLabel: { color: colors.slate700, textAlign: 'center', fontSize: 9, fontWeight: '900', marginBottom: 6, letterSpacing: 0.7 },
  timerControl: { marginTop: 12 },
  timerText: { color: '#DBEAFE', fontSize: 9, fontWeight: '800', letterSpacing: 0.4 },
  timerNumber: { color: colors.amberLight, fontWeight: '900', fontVariant: ['tabular-nums'] },
  continueButton: { width: '100%', backgroundColor: colors.slate900, borderRadius: 13, alignItems: 'center', paddingVertical: 14, marginTop: 13 },
  continueText: { color: colors.white, fontSize: 11, fontWeight: '900' },
});
