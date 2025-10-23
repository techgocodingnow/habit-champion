import "@/src/styles/theme/size";
import { defaultConfig } from "@tamagui/config/v4";
import merge from "lodash-es/merge";
import { createTamagui } from "tamagui";

import { colors } from "@/src/styles/theme/colors";
import { font1 } from "@/src/styles/theme/fonts";
import tokens from "@/src/styles/theme/tokens";
import { animations } from "./src/styles/theme/animations";

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  fonts: {
    body: font1,
    heading: font1,
    font1,
  },
  animations: merge(defaultConfig.animations, animations as any),
  tokens: merge(defaultConfig.tokens, tokens),
  themes: merge(defaultConfig.themes, colors),
});

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
