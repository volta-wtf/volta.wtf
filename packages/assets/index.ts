export function asset(path: string) {
  return `/node_modules/@repo/assets/${path}`;
}

// Fuentes
export const fonts = {
  geistSans: '/node_modules/@repo/assets/shared/fonts/GeistVF.woff',
  geistMono: '/node_modules/@repo/assets/shared/fonts/GeistMonoVF.woff',
} as const;
