export function asset(path: string) {
  return `/node_modules/@registry/assets/${path}`;
}

// Fuentes
export const fonts = {
  geistSans: '/node_modules/@registry/assets/shared/fonts/GeistVF.woff',
  geistMono: '/node_modules/@registry/assets/shared/fonts/GeistMonoVF.woff',
} as const;
