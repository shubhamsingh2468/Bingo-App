export const colors = {
  white: '#FFFFFF',
  canvas: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F172A',
  blue: '#2563EB',
  blueBright: '#3B82F6',
  cyan: '#0EA5E9',
  orange: '#F97316',
  amber: '#F59E0B',
  amberLight: '#FBBF24',
  green: '#22C55E',
  greenDark: '#16A34A',
  red: '#EF4444',
  purple: '#A855F7',
} as const;

export const bingoColors = [
  colors.red,
  colors.amber,
  colors.green,
  colors.blueBright,
  colors.purple,
] as const;
