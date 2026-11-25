import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BingoCard } from '@/components/BingoCard';
import { colors } from '@/src/constants/theme';

const cardNumbers = Array.from({ length: 600 }, (_, index) => index + 1);
const columns = ['B', 'I', 'N', 'G', 'O'];

export default function CardSelectionScreen() {
  const router = useRouter();
  const { stake: stakeParam } = useLocalSearchParams<{ stake: string }>();
  const stake = Number(stakeParam) || 20;
  const [selected, setSelected] = useState<number[]>(() => stake * 2 <= 646 ? [28, 77] : [28]);
  const remainingBalance = useMemo(() => Math.max(646 - selected.length * stake, 0), [selected.length, stake]);

  const toggleCard = (cardNumber: number) => {
    setSelected((current) => {
      if (current.includes(cardNumber)) return current.filter((value) => value !== cardNumber);
      if (current.length >= 2) {
        Alert.alert('Selection limit reached', 'Choose up to 2 bingo cards for this room.');
        return current;
      }
      if ((current.length + 1) * stake > 646) {
        Alert.alert('Insufficient balance', 'Your demo wallet does not have enough ETB for this card.');
        return current;
      }
      return [...current, cardNumber];
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.hud}>
        <Pressable style={styles.close} onPress={() => router.back()}><Text style={styles.closeText}>×</Text></Pressable>
        <View style={styles.stat}><Text style={styles.statLabel}>STATUS</Text><Text style={styles.statValueAmber}>18s</Text></View>
        <View style={styles.stat}><Text style={styles.statLabel}>WALLET</Text><Text style={styles.statValue}>{remainingBalance}</Text></View>
        <View style={styles.stat}><Text style={styles.statLabel}>PLAYERS</Text><Text style={styles.statValue}>18</Text></View>
        <View style={styles.stat}><Text style={styles.statLabel}>STAKE</Text><Text style={styles.statValue}>{stake}</Text></View>
      </View>
      <FlatList
        data={cardNumbers}
        keyExtractor={(item) => String(item)}
        numColumns={10}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.heading}>
            <Text style={styles.title}>Choose your cards</Text>
            <Text style={styles.subtitle}>Select up to 2 cards · {selected.length}/2 selected</Text>
            <View style={styles.legend}>
              {columns.map((letter, index) => <Text key={letter} style={[styles.letter, { color: [colors.red, colors.amber, colors.green, colors.blueBright, colors.purple][index] }]}>{letter}</Text>)}
              <Text style={styles.legendText}>CARD NUMBERS</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          const isSelected = selected.includes(item);
          return (
            <Pressable onPress={() => toggleCard(item)} style={[styles.numberCell, isSelected && styles.numberSelected]}>
              <Text style={[styles.numberText, isSelected && styles.numberSelectedText]}>{item}</Text>
              {isSelected ? <View style={styles.check}><Text style={styles.checkText}>✓</Text></View> : null}
            </Pressable>
          );
        }}
        ListFooterComponent={
          <View style={styles.footer}>
            {selected.length ? selected.map((number) => <BingoCard key={number} cardNumber={number} />) : (
              <View style={styles.empty}><Text style={styles.emptyText}>Tap a card number above to preview it.</Text></View>
            )}
            <View style={styles.footerButtons}>
              <Pressable onPress={() => router.back()} style={styles.backButton}><Text style={styles.backText}>← BACK</Text></Pressable>
              <Pressable
                disabled={!selected.length}
                onPress={() => router.push({ pathname: '/game-room', params: { stake: String(stake), cards: selected.join(',') } })}
                style={[styles.joinButton, !selected.length && styles.disabledButton]}
              >
                <Text style={styles.joinText}>JOIN GAME　→</Text>
              </Pressable>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  hud: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.slate900, paddingTop: 15, paddingBottom: 10, paddingHorizontal: 8 },
  close: { width: 30, height: 30, borderRadius: 10, backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center', marginRight: 5 },
  closeText: { color: colors.white, fontSize: 21, lineHeight: 24, fontWeight: '700' },
  stat: { flex: 1, alignItems: 'center' },
  statLabel: { color: colors.slate400, fontSize: 7, fontWeight: '900', letterSpacing: 0.4 },
  statValue: { color: colors.white, fontSize: 12, fontWeight: '900', marginTop: 3, fontVariant: ['tabular-nums'] },
  statValueAmber: { color: colors.amberLight, fontSize: 12, fontWeight: '900', marginTop: 3, fontVariant: ['tabular-nums'] },
  listContent: { paddingHorizontal: 14, paddingBottom: 24 },
  heading: { paddingTop: 17, paddingBottom: 12 },
  title: { color: colors.slate900, fontSize: 21, fontWeight: '900' },
  subtitle: { color: colors.slate500, fontSize: 11, marginTop: 4, fontWeight: '600' },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 13, marginTop: 14, backgroundColor: colors.white, borderRadius: 11, paddingVertical: 9, paddingHorizontal: 12 },
  letter: { fontSize: 12, fontWeight: '900' },
  legendText: { marginLeft: 'auto', color: colors.slate400, fontSize: 8, fontWeight: '900', letterSpacing: 0.6 },
  numberCell: { width: '9.25%', aspectRatio: 0.95, margin: '0.35%', borderRadius: 7, borderColor: colors.slate200, borderWidth: 1, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center' },
  numberSelected: { backgroundColor: colors.green, borderColor: colors.greenDark },
  numberText: { color: colors.slate700, fontSize: 9, fontWeight: '800', fontVariant: ['tabular-nums'] },
  numberSelectedText: { color: colors.white, fontWeight: '900' },
  check: { position: 'absolute', top: 0, right: 1, width: 10, height: 10, borderRadius: 5, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  checkText: { color: colors.greenDark, fontSize: 7, lineHeight: 9, fontWeight: '900' },
  footer: { paddingTop: 15 },
  empty: { padding: 22, alignItems: 'center', backgroundColor: colors.white, borderRadius: 14 },
  emptyText: { color: colors.slate500, fontSize: 11 },
  footerButtons: { flexDirection: 'row', gap: 9, marginTop: 4 },
  backButton: { flex: 0.8, alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 12, backgroundColor: colors.red },
  backText: { color: colors.white, fontSize: 11, fontWeight: '900' },
  joinButton: { flex: 1.4, alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 12, backgroundColor: colors.blue },
  disabledButton: { backgroundColor: colors.slate400 },
  joinText: { color: colors.white, fontSize: 11, fontWeight: '900' },
});
