import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '@/src/constants/theme';
import { prizeRanks, stakeRooms } from '@/src/mock/bingoMockData';
import { ScreenTitle } from '@/src/components/ScreenTitle';

const countdownDigits = ['02', '07', '35', '28'];

export default function GamesLobbyScreen() {
  const router = useRouter();
  const [showPrizes, setShowPrizes] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 650);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        className="flex-1 bg-slate-50"
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.orange} />}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>GOOD <Text style={styles.brandBlue}>BINGO</Text></Text>
            <Text style={styles.kicker}>LET&apos;S PLAY & WIN</Text>
          </View>
          <View style={styles.avatar}><Text style={styles.avatarText}>A</Text></View>
        </View>

        <LinearGradient
          colors={['#1D4ED8', '#0284C7', '#0EA5E9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroTop}>
            <View style={styles.prizePill}>
              <Text style={styles.prizePillText}>✦  Win the 20,000 ETB BINGO Prize</Text>
            </View>
            <Text style={styles.heroSmall}>WEEKLY GRAND TOURNAMENT</Text>
          </View>
          <Text style={styles.heroTitle}>Your next big win starts here.</Text>
          <Text style={styles.heroSub}>Play your cards. Take the prize.</Text>
          <View style={styles.timerBox}>
            {countdownDigits.map((digit, index) => (
              <View key={digit} style={styles.timerUnit}>
                <Text style={styles.timerDigit}>{digit}</Text>
                <Text style={styles.timerLabel}>{['DAYS', 'HRS', 'MIN', 'SEC'][index]}</Text>
              </View>
            ))}
          </View>
          <Pressable onPress={() => setShowPrizes(!showPrizes)} style={styles.detailsToggle}>
            <Text style={styles.detailsText}>{showPrizes ? 'Hide Details' : 'More Details'}　{showPrizes ? '⌃' : '⌄'}</Text>
          </Pressable>
        </LinearGradient>

        {showPrizes ? (
          <View style={styles.prizeDetails}>
            <View style={styles.prizeDetailsTitle}>
              <Text style={styles.detailsHeading}>WEEKLY TOP RANK CASH PRIZES</Text>
              <Text style={styles.detailsTotal}>20,000 ETB POOL</Text>
            </View>
            {prizeRanks.map((item) => (
              <View key={item.rank} style={styles.prizeRow}>
                <Text style={styles.prizeRank}>{String(item.rank).padStart(2, '0')}</Text>
                <Text style={styles.prizePlace}>{item.rank === 1 ? '1st Place' : `${item.rank}${item.rank === 2 ? 'nd' : item.rank === 3 ? 'rd' : 'th'} Place`}</Text>
                <Text style={styles.prizeValue}>{item.prize}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.balanceCard}>
          <View style={styles.balanceIcon}><Text style={styles.balanceIconText}>◈</Text></View>
          <View style={styles.balanceCopy}>
            <Text style={styles.balanceLabel}>YOUR BALANCE</Text>
            <Text style={styles.balanceAmount}>646 <Text style={styles.balanceCurrency}>ETB</Text></Text>
          </View>
          <Pressable
            accessibilityLabel="Add funds"
            style={styles.addButton}
            onPress={() => Alert.alert('Add funds', 'Wallet top-up will be connected in a future update.')}
          >
            <Text style={styles.addText}>+</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeading}>
          <ScreenTitle title="Choose your room" subtitle="Pick a stake and jump into a live game." />
          <View style={styles.liveBadge}><View style={styles.liveDot} /><Text style={styles.liveText}>LIVE ROOMS</Text></View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHead}>
            {['STAKE', 'STATUS', 'PLAYERS', 'PRIZE', ''].map((label, index) => (
              <Text key={index} style={[styles.tableHeadText, index === 4 && styles.actionHead]}>{label}</Text>
            ))}
          </View>
          {stakeRooms.map((room) => (
            <View key={room.stake} style={styles.roomRow}>
              <View style={styles.roomStake}><Text style={styles.stakeAmount}>{room.stake}</Text><Text style={styles.stakeCurrency}>ETB</Text></View>
              <View style={styles.statusColumn}>
                {room.status === 'PLAYING' ? (
                  <Text style={styles.playing}>PLAYING</Text>
                ) : (
                  <Text style={styles.countdown}>{room.countdown}s</Text>
                )}
              </View>
              <Text style={styles.roomNumber}>{room.players}</Text>
              <Text style={styles.roomPrize}>{room.prize.toLocaleString()}</Text>
              <Pressable
                disabled={!room.enabled}
                onPress={() => router.push({ pathname: '/card-selection/[stake]', params: { stake: String(room.stake) } })}
                style={[styles.playButton, !room.enabled && styles.playDisabled]}
              >
                <Text style={[styles.playText, !room.enabled && styles.playTextDisabled]}>PLAY</Text>
              </Pressable>
            </View>
          ))}
        </View>

        <View style={styles.utilityRow}>
          <Pressable style={styles.refreshButton} onPress={refresh}>
            <Text style={styles.utilityText}>↻　REFRESH</Text>
          </Pressable>
          <Pressable style={styles.reloadButton} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.utilityText}>⟳　RELOAD</Text>
          </Pressable>
        </View>
        <Text style={styles.footnote}>ROOM PRIZES ARE BASED ON CURRENT PLAYERS</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  content: { paddingHorizontal: 17, paddingTop: 9, paddingBottom: 22 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  brand: { color: colors.slate900, fontSize: 17, fontWeight: '900', letterSpacing: 0.7 },
  brandBlue: { color: colors.blue },
  kicker: { color: colors.slate500, fontSize: 9, fontWeight: '800', letterSpacing: 1.4, marginTop: 2 },
  avatar: { height: 38, width: 38, borderRadius: 14, backgroundColor: colors.slate900, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontWeight: '900', fontSize: 15 },
  hero: { borderRadius: 20, padding: 17, marginBottom: 16, overflow: 'hidden' },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 7 },
  prizePill: { backgroundColor: colors.amberLight, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 7 },
  prizePillText: { color: colors.slate900, fontSize: 9, fontWeight: '900' },
  heroSmall: { color: '#DBEAFE', fontSize: 8, fontWeight: '900', letterSpacing: 0.8 },
  heroTitle: { color: colors.white, fontWeight: '900', fontSize: 20, marginTop: 14 },
  heroSub: { color: '#DBEAFE', fontSize: 11, marginTop: 3, fontWeight: '600' },
  timerBox: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.slate900, borderRadius: 13, paddingVertical: 10, paddingHorizontal: 12, marginTop: 14 },
  timerUnit: { alignItems: 'center', flex: 1 },
  timerDigit: { color: colors.amberLight, fontSize: 19, fontWeight: '900', fontVariant: ['tabular-nums'] },
  timerLabel: { color: colors.slate400, fontSize: 7, fontWeight: '800', marginTop: 2, letterSpacing: 0.8 },
  detailsToggle: { alignSelf: 'flex-end', paddingVertical: 8, paddingLeft: 12 },
  detailsText: { color: colors.white, fontSize: 10, fontWeight: '900' },
  prizeDetails: { backgroundColor: colors.white, borderRadius: 16, marginTop: -7, marginBottom: 16, paddingHorizontal: 14, paddingVertical: 13, borderWidth: 1, borderColor: colors.slate200 },
  prizeDetailsTitle: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  detailsHeading: { color: colors.slate700, fontSize: 9, fontWeight: '900' },
  detailsTotal: { color: colors.blue, fontSize: 8, fontWeight: '900' },
  prizeRow: { flexDirection: 'row', alignItems: 'center', borderTopColor: colors.slate100, borderTopWidth: 1, paddingVertical: 7 },
  prizeRank: { width: 32, color: colors.amber, fontSize: 11, fontWeight: '900' },
  prizePlace: { flex: 1, color: colors.slate700, fontSize: 11, fontWeight: '700' },
  prizeValue: { color: colors.slate900, fontSize: 11, fontWeight: '900', fontVariant: ['tabular-nums'] },
  balanceCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 17, padding: 13, borderWidth: 1, borderColor: colors.slate200, marginBottom: 20 },
  balanceIcon: { width: 41, height: 41, backgroundColor: colors.orange, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  balanceIconText: { color: colors.white, fontSize: 20, fontWeight: '900' },
  balanceCopy: { marginLeft: 11, flex: 1 },
  balanceLabel: { color: colors.slate500, fontSize: 8, fontWeight: '900', letterSpacing: 1 },
  balanceAmount: { color: colors.slate900, fontSize: 20, fontWeight: '900', marginTop: 1, fontVariant: ['tabular-nums'] },
  balanceCurrency: { color: colors.slate500, fontSize: 11 },
  addButton: { backgroundColor: colors.green, width: 35, height: 35, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  addText: { color: colors.white, fontSize: 25, lineHeight: 28, fontWeight: '500' },
  sectionHeading: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 4, paddingHorizontal: 8, paddingVertical: 6, backgroundColor: colors.white, borderRadius: 12, borderWidth: 1, borderColor: colors.slate200 },
  liveDot: { width: 6, height: 6, borderRadius: 4, backgroundColor: colors.green, marginRight: 5 },
  liveText: { color: colors.slate700, fontSize: 7, fontWeight: '900', letterSpacing: 0.4 },
  table: { borderRadius: 15, overflow: 'hidden', backgroundColor: colors.white, borderWidth: 1, borderColor: colors.slate200 },
  tableHead: { height: 34, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, backgroundColor: colors.slate100 },
  tableHeadText: { width: '18%', color: colors.slate500, fontSize: 7, fontWeight: '900', letterSpacing: 0.3 },
  actionHead: { width: '15%', textAlign: 'center' },
  roomRow: { minHeight: 59, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, borderTopWidth: 1, borderTopColor: colors.slate100 },
  roomStake: { width: '18%', flexDirection: 'row', alignItems: 'baseline' },
  stakeAmount: { color: colors.slate900, fontSize: 13, fontWeight: '900', fontVariant: ['tabular-nums'] },
  stakeCurrency: { color: colors.slate500, fontSize: 7, fontWeight: '800', marginLeft: 2 },
  statusColumn: { width: '18%' },
  playing: { color: colors.red, fontSize: 8, fontWeight: '900' },
  countdown: { color: '#D97706', fontSize: 11, fontWeight: '900', fontVariant: ['tabular-nums'] },
  roomNumber: { width: '17%', color: colors.slate700, fontSize: 11, fontWeight: '800', fontVariant: ['tabular-nums'] },
  roomPrize: { width: '17%', color: colors.slate900, fontSize: 10, fontWeight: '900', fontVariant: ['tabular-nums'] },
  playButton: { width: '30%', paddingVertical: 8, borderRadius: 8, backgroundColor: colors.blue, alignItems: 'center' },
  playDisabled: { backgroundColor: colors.slate200 },
  playText: { color: colors.white, fontSize: 9, fontWeight: '900' },
  playTextDisabled: { color: colors.slate500 },
  utilityRow: { flexDirection: 'row', gap: 9, marginTop: 14 },
  refreshButton: { flex: 1, backgroundColor: colors.orange, borderRadius: 12, paddingVertical: 13, alignItems: 'center' },
  reloadButton: { flex: 1, backgroundColor: '#4F46E5', borderRadius: 12, paddingVertical: 13, alignItems: 'center' },
  utilityText: { color: colors.white, fontSize: 10, fontWeight: '900', letterSpacing: 0.6 },
  footnote: { textAlign: 'center', color: colors.slate400, fontSize: 8, fontWeight: '700', marginTop: 12, letterSpacing: 0.6 },
});
