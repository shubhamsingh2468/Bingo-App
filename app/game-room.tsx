import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { BingoCard } from '@/src/components/BingoCard';
import { bingoColors, colors } from '@/src/constants/theme';
import { BingoColumn, sampleCalls, selectedCardNumbers } from '@/src/mock/bingoMockData';

const letters: BingoColumn[] = ['B', 'I', 'N', 'G', 'O'];
const calledNumbers = sampleCalls.map((call) => call.number);

export default function GameRoomScreen() {
  const router = useRouter();
  const { stake: stakeParam, cards: cardsParam } = useLocalSearchParams<{ stake: string; cards?: string }>();
  const stake = Number(stakeParam) || 20;
  const cards = useMemo(() => {
    const parsed = cardsParam?.split(',').map(Number).filter((number) => Number.isInteger(number) && number > 0);
    return parsed?.length ? parsed : selectedCardNumbers;
  }, [cardsParam]);
  const [auto, setAuto] = useState(false);
  const [daubed, setDaubed] = useState<number[]>([]);
  const activeCall = sampleCalls[0];
  const recentCalls = sampleCalls.slice(1, 5);
  const autoDaubs = auto ? calledNumbers : [];

  const toggleDaub = (number: number) => {
    setDaubed((current) => current.includes(number) ? current.filter((value) => value !== number) : [...current, number]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.hud}>
        <Pressable onPress={() => router.replace('/(tabs)')} style={styles.close}><Text style={styles.closeText}>×</Text></Pressable>
        <View style={styles.hudStat}><Text style={styles.hudLabel}>PLAYERS</Text><Text style={styles.hudValue}>18</Text></View>
        <View style={styles.hudStat}><Text style={styles.hudLabel}>PRIZE</Text><Text style={styles.hudValue}>{(stake * 18).toLocaleString()}</Text></View>
        <View style={styles.hudStat}><Text style={styles.hudLabel}>STAKE</Text><Text style={styles.hudValue}>{stake}</Text></View>
        <View style={styles.hudStat}><Text style={styles.hudLabel}>CALLED</Text><Text style={styles.hudValue}>{sampleCalls.length}</Text></View>
      </View>
      <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={styles.content}>
        <View style={styles.mainRow}>
          <View style={styles.board}>
            <Text style={styles.sectionLabel}>CALLED NUMBERS</Text>
            <View style={styles.letters}>
              {letters.map((letter, index) => <Text key={letter} style={[styles.letter, { color: bingoColors[index] }]}>{letter}</Text>)}
            </View>
            {Array.from({ length: 15 }, (_, row) => (
              <View key={row} style={styles.numberRow}>
                {letters.map((_, column) => {
                  const number = column * 15 + row + 1;
                  const called = calledNumbers.includes(number);
                  return (
                    <View key={number} style={[styles.boardCell, called && styles.calledCell]}>
                      <Text style={[styles.boardNumber, called && styles.calledNumber]}>{number}</Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
          <View style={styles.callPanel}>
            <Text style={styles.sectionLabel}>CURRENT</Text>
            <View style={styles.callBall}>
              <Text style={[styles.callLetter, { color: bingoColors[letters.indexOf(activeCall.column)] }]}>{activeCall.column}</Text>
              <Text style={styles.callNumber}>{activeCall.number}</Text>
            </View>
            <Text style={styles.recentTitle}>RECENT</Text>
            {recentCalls.map((call) => (
              <View key={call.number} style={styles.recentChip}>
                <Text style={[styles.recentLetter, { color: bingoColors[letters.indexOf(call.column)] }]}>{call.column}</Text>
                <Text style={styles.recentNumber}>{call.number}</Text>
              </View>
            ))}
            <View style={styles.autoRow}>
              <Text style={styles.autoLabel}>AUTO</Text>
              <Switch
                value={auto}
                onValueChange={setAuto}
                trackColor={{ false: colors.slate200, true: colors.green }}
                thumbColor={colors.white}
                style={styles.switch}
              />
            </View>
          </View>
        </View>

        <View style={styles.cardsHeading}>
          <Text style={styles.cardsTitle}>YOUR CARDS</Text>
          <Text style={styles.cardsCount}>{cards.length} ACTIVE</Text>
        </View>
        {cards.map((number) => (
          <BingoCard key={number} cardNumber={number} daubed={auto ? autoDaubs : daubed} onCellPress={toggleDaub} />
        ))}

        <Pressable
          style={styles.bingoButton}
          onPress={() => router.push({ pathname: '/winner', params: { card: String(cards[0] ?? 28), stake: String(stake) } })}
        >
          <Text style={styles.bingoButtonText}>✦　BINGO!</Text>
        </Pressable>
        <Pressable
          style={styles.leaveButton}
          onPress={() => Alert.alert('Leave game?', 'Your demo game will end.', [
            { text: 'Stay', style: 'cancel' },
            { text: 'Leave', style: 'destructive', onPress: () => router.replace('/(tabs)') },
          ])}
        >
          <Text style={styles.leaveText}>LEAVE GAME</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  hud: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.slate900, paddingVertical: 11, paddingHorizontal: 8 },
  close: { width: 29, height: 29, borderRadius: 9, backgroundColor: colors.slate800, alignItems: 'center', justifyContent: 'center', marginRight: 4 },
  closeText: { color: colors.white, fontSize: 21, lineHeight: 25, fontWeight: '700' },
  hudStat: { flex: 1, alignItems: 'center' },
  hudLabel: { color: colors.slate400, fontSize: 7, fontWeight: '900', letterSpacing: 0.4 },
  hudValue: { color: colors.white, fontSize: 11, fontWeight: '900', marginTop: 3, fontVariant: ['tabular-nums'] },
  content: { padding: 12, paddingBottom: 22 },
  mainRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  board: { flex: 1, backgroundColor: colors.white, borderRadius: 14, padding: 8, borderColor: colors.slate200, borderWidth: 1 },
  sectionLabel: { textAlign: 'center', color: colors.slate500, fontSize: 8, fontWeight: '900', letterSpacing: 0.7, marginBottom: 8 },
  letters: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  letter: { flex: 1, textAlign: 'center', fontSize: 10, fontWeight: '900' },
  numberRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  boardCell: { flex: 1, aspectRatio: 1.15, marginHorizontal: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 4, backgroundColor: colors.slate100 },
  calledCell: { backgroundColor: colors.green },
  boardNumber: { color: colors.slate700, fontSize: 8, fontWeight: '700', fontVariant: ['tabular-nums'] },
  calledNumber: { color: colors.white, fontWeight: '900' },
  callPanel: { width: 91, alignItems: 'center', backgroundColor: colors.white, borderRadius: 14, padding: 8, borderColor: colors.slate200, borderWidth: 1 },
  callBall: { width: 62, height: 62, borderRadius: 31, backgroundColor: colors.slate900, borderWidth: 4, borderColor: colors.amberLight, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  callLetter: { fontSize: 9, fontWeight: '900' },
  callNumber: { color: colors.white, fontSize: 18, fontWeight: '900', lineHeight: 22, fontVariant: ['tabular-nums'] },
  recentTitle: { color: colors.slate500, fontSize: 7, fontWeight: '900', marginBottom: 4, letterSpacing: 0.6 },
  recentChip: { width: 57, flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 4, backgroundColor: colors.slate100, borderRadius: 7, marginBottom: 4 },
  recentLetter: { fontSize: 9, fontWeight: '900' },
  recentNumber: { color: colors.slate700, fontSize: 9, fontWeight: '900', fontVariant: ['tabular-nums'] },
  autoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  autoLabel: { color: colors.slate700, fontSize: 8, fontWeight: '900' },
  switch: { transform: [{ scale: 0.65 }] },
  cardsHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 },
  cardsTitle: { color: colors.slate900, fontSize: 12, fontWeight: '900', letterSpacing: 0.6 },
  cardsCount: { color: colors.greenDark, fontSize: 8, fontWeight: '900' },
  bingoButton: { backgroundColor: colors.blue, borderRadius: 14, paddingVertical: 15, alignItems: 'center', marginTop: 2 },
  bingoButtonText: { color: colors.white, fontSize: 17, fontWeight: '900', letterSpacing: 1 },
  leaveButton: { alignItems: 'center', paddingVertical: 13, marginTop: 5 },
  leaveText: { color: colors.red, fontSize: 10, fontWeight: '900', letterSpacing: 0.8 },
});
