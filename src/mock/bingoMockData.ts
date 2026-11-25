export type StakeRoom = {
  stake: number;
  status: 'PLAYING' | 'COUNTDOWN';
  countdown?: number;
  players: number;
  prize: number;
  enabled: boolean;
};

export type RankedPlayer = {
  rank: number;
  playerId: string;
  wins: number;
  prize: number;
};

export type BingoColumn = 'B' | 'I' | 'N' | 'G' | 'O';

export const prizeRanks = [
  { rank: 1, prize: '8,000 ETB' },
  { rank: 2, prize: '4,000 ETB' },
  { rank: 3, prize: '2,000 ETB' },
  { rank: 4, prize: '1,500 ETB' },
  { rank: 5, prize: '1,200 ETB' },
  { rank: 6, prize: '1,000 ETB' },
  { rank: 7, prize: '800 ETB' },
  { rank: 8, prize: '600 ETB' },
  { rank: 9, prize: '500 ETB' },
  { rank: 10, prize: '400 ETB' },
];

export const stakeRooms: StakeRoom[] = [
  { stake: 10, status: 'PLAYING', players: 24, prize: 240, enabled: true },
  { stake: 20, status: 'COUNTDOWN', countdown: 18, players: 18, prize: 360, enabled: true },
  { stake: 50, status: 'COUNTDOWN', countdown: 48, players: 12, prize: 600, enabled: true },
  { stake: 100, status: 'PLAYING', players: 8, prize: 800, enabled: true },
  { stake: 500, status: 'COUNTDOWN', countdown: 32, players: 5, prize: 2_500, enabled: false },
  { stake: 1_000, status: 'PLAYING', players: 2, prize: 2_000, enabled: false },
];

export const rankedPlayers: RankedPlayer[] = [
  { rank: 1, playerId: '2519••••••32', wins: 18, prize: 8_000 },
  { rank: 2, playerId: '2519••••••08', wins: 15, prize: 4_000 },
  { rank: 3, playerId: '2519••••••74', wins: 13, prize: 2_000 },
  { rank: 4, playerId: '2519••••••19', wins: 11, prize: 1_200 },
  { rank: 5, playerId: '2519••••••61', wins: 9, prize: 1_000 },
  { rank: 6, playerId: '2519••••••42', wins: 8, prize: 800 },
  { rank: 7, playerId: '2519••••••91', wins: 7, prize: 700 },
  { rank: 8, playerId: '2519••••••55', wins: 6, prize: 600 },
  { rank: 9, playerId: '2519••••••27', wins: 5, prize: 500 },
  { rank: 10, playerId: '2519••••••83', wins: 4, prize: 400 },
];

export const sampleCalls: { column: BingoColumn; number: number }[] = [
  { column: 'O', number: 67 },
  { column: 'G', number: 46 },
  { column: 'B', number: 12 },
  { column: 'G', number: 54 },
  { column: 'I', number: 23 },
  { column: 'N', number: 38 },
];

export const selectedCardNumbers = [28, 77];

export function getCardNumbers(cardNumber: number): (number | null)[] {
  const start = (cardNumber * 7) % 15;
  const columns = [
    { min: 1, max: 15 },
    { min: 16, max: 30 },
    { min: 31, max: 45 },
    { min: 46, max: 60 },
    { min: 61, max: 75 },
  ];

  return columns.flatMap(({ min, max }, columnIndex) =>
    Array.from({ length: 5 }, (_, row) => {
      if (columnIndex === 2 && row === 2) return null;
      return min + ((start + row * 3 + columnIndex * 5) % (max - min + 1));
    }),
  );
}
