import { useAppStore } from "@/src/store";
import { getFontSize } from "@tamagui/font-size";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type {
  FontSizeTokens,
  FontTokens,
  GetProps,
  GetThemeValueForKey,
} from "tamagui";
import { styled, Text as TText } from "tamagui";

const createTypographySet = (
  key: string,
  options: {
    lineHeight: GetThemeValueForKey<"lineHeight">;
    fontSize: GetThemeValueForKey<"fontSize">;
  }
) => {
  return {
    [`${key}L`]: {
      ...options,
      fontWeight: "$3" as GetThemeValueForKey<"fontWeight">,
    },
    [`${key}R`]: {
      ...options,
      fontWeight: "$4" as GetThemeValueForKey<"fontWeight">,
    },
    [`${key}M`]: {
      ...options,
      fontWeight: "$5" as GetThemeValueForKey<"fontWeight">,
    },
    [`${key}S`]: {
      ...options,
      fontWeight: "$6" as GetThemeValueForKey<"fontWeight">,
    },
    [`${key}B`]: {
      ...options,
      fontWeight: "$7" as GetThemeValueForKey<"fontWeight">,
    },
  };
};

const TypographyVariants = {
  ...createTypographySet("body", {
    lineHeight: "$23" as GetThemeValueForKey<"lineHeight">,
    fontSize: "$16" as GetThemeValueForKey<"fontSize">,
  }),
  ...createTypographySet("description", {
    lineHeight: "$18" as GetThemeValueForKey<"lineHeight">,
    fontSize: "$12" as GetThemeValueForKey<"fontSize">,
  }),
  ...createTypographySet("label", {
    lineHeight: "$24" as GetThemeValueForKey<"lineHeight">,
    fontSize: "$16" as GetThemeValueForKey<"fontSize">,
  }),
  ...createTypographySet("header", {
    lineHeight: "$36" as GetThemeValueForKey<"lineHeight">,
    fontSize: "$28" as GetThemeValueForKey<"fontSize">,
  }),
  ...createTypographySet("heading", {
    lineHeight: "$24" as GetThemeValueForKey<"lineHeight">,
    fontSize: "$16" as GetThemeValueForKey<"fontSize">,
  }),
  ...createTypographySet("h1", {
    lineHeight: "$48" as GetThemeValueForKey<"lineHeight">,
    fontSize: "$32" as GetThemeValueForKey<"fontSize">,
  }),
  ...createTypographySet("h2", {
    lineHeight: "$36" as GetThemeValueForKey<"lineHeight">,
    fontSize: "$24" as GetThemeValueForKey<"fontSize">,
  }),
  ...createTypographySet("h3", {
    lineHeight: "$17" as GetThemeValueForKey<"lineHeight">,
    fontSize: "$18" as GetThemeValueForKey<"fontSize">,
  }),
  ...createTypographySet("h4", {
    lineHeight: "$24" as GetThemeValueForKey<"lineHeight">,
    fontSize: "$16" as GetThemeValueForKey<"fontSize">,
  }),
  ...createTypographySet("h5", {
    lineHeight: "$22" as GetThemeValueForKey<"lineHeight">,
    fontSize: "$14" as GetThemeValueForKey<"fontSize">,
  }),
  ...createTypographySet("h6", {
    lineHeight: "$18" as GetThemeValueForKey<"lineHeight">,
    fontSize: "$12" as GetThemeValueForKey<"fontSize">,
  }),
};

type WeightSuffix = "L" | "R" | "M" | "S" | "B";
type SizePrefix =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "description"
  | "label"
  | "header"
  | "heading";
type TypographyVariantType = `${SizePrefix}${WeightSuffix}`;

const StyledTypography = styled(TText, {
  variants: {
    variant: TypographyVariants,
  } as const,
});

export type TypographyProps = GetProps<typeof StyledTypography> & {
  ns?: "common" | "reading";
  value?: string | number | null;
  tx?: string;
  txOptions?: Record<string, unknown>;
  variant?: TypographyVariantType;
  maxFontSizeScale?: number;
  fontFamilyVariant?: "primary" | "secondary";
};

const TypographyBase = (props: TypographyProps) => {
  const {
    value,
    tx,
    txOptions,
    children,
    color = "$text_default",
    variant = "bodyR",
    fontFamilyVariant = "secondary",
    maxFontSizeScale,
    fontFamily,
    fontSize,
    ns,
    ...rest
  } = props;
  const fontScaleValue = useAppStore((state) => state.fontScale);
  const fontFamilyValue = useAppStore((state) => state.fontFamily);
  const { t } = useTranslation(ns);

  const calculatedFontSize = useMemo(() => {
    const fontSizeInput = fontSize;
    const fontFamilyInput = fontFamily as FontTokens;

    const size = fontSizeInput ?? TypographyVariants[variant]?.fontSize;

    let fontSizeFromTheme: number;
    if (typeof size === "number") {
      fontSizeFromTheme = size * fontScaleValue;
    } else {
      const fontSize = getFontSize(size as FontSizeTokens, {
        font: fontFamilyInput?.[0] === "$" ? fontFamilyInput : undefined,
      });
      fontSizeFromTheme = fontSize * fontScaleValue;
    }
    const newFontSize = fontSizeFromTheme * fontScaleValue;
    if (maxFontSizeScale) {
      return Math.min(newFontSize, fontSizeFromTheme * maxFontSizeScale);
    }

    return newFontSize;
  }, [fontScaleValue, maxFontSizeScale, fontFamily, fontSize, variant]);

  const content = useMemo(() => {
    if (value || children || typeof value === "number") {
      return typeof value === "number" || value ? value.toString() : children;
    }
    if (tx) {
      return t(tx as never, txOptions || {});
    }
    return "";
  }, [value, children, tx, txOptions, t]);

  return (
    <StyledTypography
      variant={variant}
      fontSize={calculatedFontSize}
      fontFamily={
        fontFamilyValue[
          fontFamilyVariant as keyof typeof fontFamilyValue
        ] as GetThemeValueForKey<"fontFamily">
      }
      color={color as GetThemeValueForKey<"color">}
      {...rest}
    >
      {content}
    </StyledTypography>
  );
};

export const Typography = TypographyBase;
