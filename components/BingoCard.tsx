import { Pressable, StyleSheet, Text, View } from 'react-native';
import { bingoColors, colors } from '@/src/constants/theme';
import { getCardNumbers } from '@/src/mock/bingoMockData';

type Props = {
  cardNumber: number;
  daubed?: number[];
  winning?: boolean;
  onCellPress?: (number: number) => void;
};

const columns = ['B', 'I', 'N', 'G', 'O'];

export function BingoCard({ cardNumber, daubed = [], winning = false, onCellPress }: Props) {
  const numbers = getCardNumbers(cardNumber);
  return (
    <View style={styles.card}>
      <View style={styles.cardHeading}>
        <Text style={styles.cardTitle}>CARD NO {cardNumber}</Text>
        <Text style={styles.cardHint}>{onCellPress ? 'TAP TO DAUB' : 'BINGO CARD'}</Text>
      </View>
      <View style={styles.columnHeading}>
        {columns.map((letter, index) => (
          <Text key={letter} style={[styles.columnLetter, { color: bingoColors[index] }]}>
            {letter}
          </Text>
        ))}
      </View>
      {[0, 1, 2, 3, 4].map((row) => (
        <View key={row} style={styles.row}>
          {[0, 1, 2, 3, 4].map((column) => {
            const number = numbers[column * 5 + row];
            const isFree = column === 2 && row === 2;
            const isDaubed = isFree || (number !== null && daubed.includes(number));
            return (
              <Pressable
                key={`${row}-${column}`}
                disabled={isFree || !onCellPress}
                onPress={() => number !== null && onCellPress?.(number)}
                style={[
                  styles.cell,
                  isDaubed && styles.daubed,
                  winning && (row === 2 || column === 2) && styles.winningCell,
                ]}
              >
                <Text style={[styles.cellText, isDaubed && styles.daubedText]}>
                  {isFree ? '★' : number}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderColor: colors.slate200,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  cardHeading: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  cardTitle: { color: colors.slate900, fontWeight: '900', fontSize: 13, letterSpacing: 0.6 },
  cardHint: { color: colors.slate500, fontSize: 9, fontWeight: '800', letterSpacing: 0.6 },
  columnHeading: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 5 },
  columnLetter: { width: '19%', textAlign: 'center', fontWeight: '900', fontSize: 13 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  cell: {
    width: '19%',
    aspectRatio: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: colors.slate100,
  },
  cellText: { fontSize: 12, color: colors.slate800, fontWeight: '800', fontVariant: ['tabular-nums'] },
  daubed: { backgroundColor: colors.green },
  daubedText: { color: colors.white },
  winningCell: { backgroundColor: colors.amberLight },
});
