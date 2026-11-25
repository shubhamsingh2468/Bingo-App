import { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/src/constants/theme';
import { telegramInitDataPreview } from '@/src/mock/telegramMockData';

export default function EntryAuthScreen() {
  const router = useRouter();
  const [language, setLanguage] = useState<'EN' | 'አማ'>('EN');
  const isAmharic = language === 'አማ';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 items-center justify-center px-6" style={styles.content}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setLanguage(language === 'EN' ? 'አማ' : 'EN')}
          style={styles.language}
        >
          <Text style={styles.languageText}>{language}　⌄</Text>
        </Pressable>
        <View style={styles.logo}>
          <Text style={styles.bingoBall}>B</Text>
        </View>
        <Text style={styles.brand}>GOOD BINGO</Text>
        <Text style={styles.tagline}>{isAmharic ? 'የእድል ቁጥሮችዎ ይጠብቁዎታል' : 'Your lucky numbers are waiting'}</Text>
        <View style={styles.telegramNote}>
          <Text style={styles.noteTitle}>
            {isAmharic
              ? `እንኳን ደህና መጡ፣ ${telegramInitDataPreview.user.first_name}`
              : `Welcome, ${telegramInitDataPreview.user.first_name}`}
          </Text>
          <Text style={styles.noteBody}>
            {isAmharic
              ? 'የቴሌግራም መግቢያ መለያዎን ያገናኛል። ለዚህ ቅድመ እይታ በቀጥታ ወደ ጨዋታ ክፍሉ ይግቡ።'
              : 'Your demo Telegram profile is ready. Sign-in verification will be connected in a later milestone.'}
          </Text>
          <Text style={styles.mockLabel}>MOCK INITDATA · {telegramInitDataPreview.user.username}</Text>
        </View>
        <Pressable style={styles.button} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.buttonText}>{isAmharic ? 'እንጫወት　→' : 'LET’S PLAY　→'}</Text>
        </Pressable>
        <Text style={styles.footer}>{isAmharic ? 'የሙከራ ሁነታ · ምሳሌ የኪስ ቦርሳ' : 'DEMO MODE · MOCK WALLET'}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  content: { paddingBottom: 24 },
  language: {
    position: 'absolute',
    top: 18,
    right: 24,
    paddingHorizontal: 13,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  languageText: { color: colors.slate700, fontSize: 12, fontWeight: '800' },
  logo: {
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-6deg' }],
    marginBottom: 18,
  },
  bingoBall: { color: colors.white, fontWeight: '900', fontSize: 40 },
  brand: { color: colors.slate900, fontSize: 27, fontWeight: '900', letterSpacing: 1.3 },
  tagline: { marginTop: 7, color: colors.slate500, fontSize: 14, fontWeight: '600' },
  telegramNote: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    marginTop: 52,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  noteTitle: { color: colors.slate900, fontSize: 15, fontWeight: '900', marginBottom: 6 },
  noteBody: { color: colors.slate500, lineHeight: 19, fontSize: 12 },
  mockLabel: { color: colors.blue, fontSize: 8, fontWeight: '900', letterSpacing: 0.6, marginTop: 10 },
  button: {
    width: '100%',
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: colors.blue,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: { color: colors.white, fontWeight: '900', fontSize: 14, letterSpacing: 0.6 },
  footer: { marginTop: 22, color: colors.slate400, fontSize: 9, fontWeight: '900', letterSpacing: 1.2 },
});
