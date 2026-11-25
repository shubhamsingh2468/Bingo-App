export type TelegramInitDataPreview = {
  auth_date: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
  };
  hash: string;
};

export const telegramInitDataPreview: TelegramInitDataPreview = {
  auth_date: 1_798_272_000,
  user: {
    id: 10001,
    first_name: 'Amanuel',
    last_name: 'Legesse',
    username: 'amanuel_demo',
    language_code: 'en',
  },
  hash: 'expo-go-demo-only',
};
