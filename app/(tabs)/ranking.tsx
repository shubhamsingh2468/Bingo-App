import { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, Pressable, View } from 'react-native';
import { colors } from '@/src/constants/theme';
import { rankedPlayers } from '@/src/mock/bingoMockData';
import { ScreenTitle } from '@/src/components/ScreenTitle';

const periods = ['DAILY (1-30)', 'WEEKLY (1-20)', 'LAST WEEK (1-10)'];
const pages = ['RANK 1-5', 'RANK 16-20', 'RANK 26-30'];

export default function RankingScreen() {
  const [period, setPeriod] = useState(periods[1]);
  const [page, setPage] = useState(0);
  const visiblePlayers = rankedPlayers.slice(0, 5);
  const pageOffset = page === 1 ? 15 : page === 2 ? 25 : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={styles.content}>
        <View style={styles.top}>
          <Text style={styles.brand}>GOOD <Text style={{ color: colors.blueBright }}>BINGO</Text></Text>
          <View style={styles.avatar}><Text style={styles.avatarText}>A</Text></View>
        </View>
        <View style={styles.hero}>
          <View style={styles.heroLabel}><Text style={styles.heroLabelText}>✦　TOURNAMENT LEADERBOARD</Text></View>
          <Text style={styles.heroTitle}>20,000 ETB BINGO{'\n'}WINNERS</Text>
          <View style={styles.prizeBar}>
            <View>
              <Text style={styles.poolCaption}>WEEKLY GRAND PRIZE POOL</Text>
              <Text style={styles.poolAmount}>20,000 ETB</Text>
            </View>
            <Text style={styles.trophy}>🏆</Text>
          </View>
          <View style={styles.timer}>
            {['02', '07', '35', '28'].map((value, index) => (
              <View key={index} style={styles.timerUnit}>
                <Text style={styles.timerNumber}>{value}</Text>
                <Text style={styles.timerLabel}>{['DAYS', 'HRS', 'MIN', 'SEC'][index]}</Text>
              </View>
            ))}
          </View>
        </View>

        <ScreenTitle title="Top players" subtitle="Compete, climb the ranks, and win big." />

        <View style={styles.periodTabs}>
          {periods.map((item) => (
            <Pressable key={item} onPress={() => setPeriod(item)} style={[styles.periodTab, period === item && styles.periodActive]}>
              <Text style={[styles.periodText, period === item && styles.periodTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.table}>
          <View style={styles.tableHead}>
            <Text style={[styles.tableHeading, { width: '13%' }]}>RANK</Text>
            <Text style={[styles.tableHeading, { flex: 1 }]}>PLAYER ID</Text>
            <Text style={[styles.tableHeading, { width: '17%' }]}>WINS</Text>
            <Text style={[styles.tableHeading, { width: '27%', textAlign: 'right' }]}>PRIZE</Text>
          </View>
          {visiblePlayers.map((player, index) => {
            const rank = player.rank + pageOffset;
            return (
              <View key={player.playerId} style={styles.playerRow}>
                <View style={[styles.rankBadge, rank === 1 && styles.firstRank]}>
                  <Text style={[styles.rankText, rank === 1 && styles.firstRankText]}>{rank}</Text>
                </View>
                <Text style={styles.playerId}>{player.playerId}</Text>
                <View style={styles.wins}>
                  <Text style={styles.miniTrophy}>🏆</Text>
                  <Text style={styles.winCount}>{player.wins}</Text>
                </View>
                <Text style={styles.prizeValue}>{index < 10 ? player.prize.toLocaleString() : '300'} ETB</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.pagination}>
          {pages.map((item, index) => (
            <Pressable key={item} onPress={() => setPage(index)} style={[styles.pageButton, page === index && styles.pageActive]}>
              <Text style={[styles.pageText, page === index && styles.pageTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.note}>PRIZES ARE AWARDED AT THE END OF EACH TOURNAMENT PERIOD</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  content: { paddingHorizontal: 17, paddingTop: 9, paddingBottom: 24 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  brand: { color: colors.slate900, fontSize: 17, fontWeight: '900', letterSpacing: 0.7 },
  avatar: { width: 38, height: 38, borderRadius: 14, backgroundColor: colors.slate900, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontWeight: '900' },
  hero: { backgroundColor: colors.slate900, borderRadius: 20, padding: 17, marginBottom: 20 },
  heroLabel: { alignSelf: 'flex-start', borderRadius: 20, backgroundColor: '#1E293B', paddingVertical: 6, paddingHorizontal: 10 },
  heroLabelText: { color: colors.amberLight, fontSize: 8, fontWeight: '900', letterSpacing: 0.6 },
  heroTitle: { color: colors.white, fontSize: 22, lineHeight: 27, fontWeight: '900', marginTop: 13, letterSpacing: 0.3 },
  prizeBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, borderRadius: 13, backgroundColor: '#1E293B', padding: 12 },
  poolCaption: { color: colors.slate400, fontSize: 8, fontWeight: '800', letterSpacing: 0.8 },
  poolAmount: { color: colors.amberLight, fontSize: 17, fontWeight: '900', marginTop: 3, fontVariant: ['tabular-nums'] },
  trophy: { fontSize: 23 },
  timer: { flexDirection: 'row', marginTop: 10, paddingVertical: 9, borderRadius: 13, backgroundColor: '#020617' },
  timerUnit: { flex: 1, alignItems: 'center' },
  timerNumber: { color: colors.amberLight, fontSize: 17, fontWeight: '900', fontVariant: ['tabular-nums'] },
  timerLabel: { color: colors.slate400, fontSize: 7, fontWeight: '900', marginTop: 3, letterSpacing: 0.6 },
  periodTabs: { flexDirection: 'row', gap: 5, marginTop: -4, marginBottom: 12 },
  periodTab: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white, borderRadius: 9, paddingVertical: 10, borderWidth: 1, borderColor: colors.slate200 },
  periodActive: { backgroundColor: colors.blue, borderColor: colors.blue },
  periodText: { color: colors.slate500, fontSize: 7, fontWeight: '900' },
  periodTextActive: { color: colors.white },
  table: { backgroundColor: colors.white, borderRadius: 15, overflow: 'hidden', borderWidth: 1, borderColor: colors.slate200 },
  tableHead: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, height: 36, backgroundColor: colors.slate100 },
  tableHeading: { color: colors.slate500, fontSize: 8, fontWeight: '900' },
  playerRow: { minHeight: 54, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderTopColor: colors.slate100, borderTopWidth: 1 },
  rankBadge: { width: 26, height: 26, backgroundColor: colors.slate100, borderRadius: 9, justifyContent: 'center', alignItems: 'center' },
  firstRank: { backgroundColor: '#FEF3C7' },
  rankText: { color: colors.slate700, fontSize: 10, fontWeight: '900', fontVariant: ['tabular-nums'] },
  firstRankText: { color: '#B45309' },
  playerId: { flex: 1, marginLeft: 8, color: colors.slate800, fontSize: 10, fontWeight: '800', fontVariant: ['tabular-nums'] },
  wins: { width: '17%', flexDirection: 'row', alignItems: 'center' },
  miniTrophy: { fontSize: 10, marginRight: 3 },
  winCount: { color: colors.slate700, fontSize: 10, fontWeight: '800', fontVariant: ['tabular-nums'] },
  prizeValue: { width: '27%', textAlign: 'right', color: colors.slate900, fontSize: 9, fontWeight: '900', fontVariant: ['tabular-nums'] },
  pagination: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 14 },
  pageButton: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.slate200, paddingHorizontal: 10, paddingVertical: 9, borderRadius: 9 },
  pageActive: { backgroundColor: colors.slate900, borderColor: colors.slate900 },
  pageText: { color: colors.slate500, fontSize: 8, fontWeight: '900' },
  pageTextActive: { color: colors.white },
  note: { color: colors.slate400, fontSize: 8, fontWeight: '700', textAlign: 'center', marginTop: 13, lineHeight: 13 },
});
