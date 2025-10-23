import { Platform } from "react-native";
import { createFont } from "tamagui";

export const baseFontName = "Inter";
export const baseRegularFontName = "Inter_400Regular";
export const baseMediumFontName = "Inter_500Medium";
export const baseSemiBoldFontName = "Inter_600SemiBold";
export const baseBoldFontName = "Inter_700Bold";

export const secondaryFontName = "Inter";

export const size = {
  4: 16,
  true: 16,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  18: 18,
  20: 20,
  22: 22,
  24: 24,
  26: 26,
  28: 28,
  30: 30,
  32: 32,
  34: 34,
  36: 36,
  40: 40,
};

const lineHeight = {
  16: 16,
  17: 17,
  18: 18,
  20: 20,
  23: 23,
  24: 24,
  28: 28,
  32: 32,
  36: 36,
  40: 40,
  44: 44,
  52: 52,
  // ...
};

export const font1 = createFont({
  family: "MinionPro",
  size,
  lineHeight,
  weight: {
    4: "400",
    5: "500",
    6: "600",
    7: "700",
  },
  letterSpacing: {
    4: 0,
    8: -1,
  },
  // (native only) swap out fonts by face/style
  ...Platform.select({
    ios: {
      face: {
        400: { normal: "Inter_400Regular" },
        500: { normal: "Inter_500Medium" },
        600: { normal: "Inter_600SemiBold" },
        700: { normal: "Inter_700Bold" },
      },
    },
  }),

  // you may also set `transform` as textTransform values
  // and `style` as fontStyle values
});
