import { type ElementType, forwardRef, useMemo } from "react";
import type { OpaqueColorValue, ViewStyle } from "react-native";
import type {
  GetProps,
  GetThemeValueForKey,
  TamaguiElement,
  Tokens,
} from "tamagui";
import { Stack, styled } from "tamagui";

import icons from "./icons";

export type IconName = keyof typeof icons;

type Props = {
  name: IconName;
  color?: GetThemeValueForKey<"color"> | OpaqueColorValue;
  stroke?: GetThemeValueForKey<"color"> | OpaqueColorValue;
  fill?: GetThemeValueForKey<"color"> | OpaqueColorValue;
  size?: number | string | GetThemeValueForKey<"size">;
  height?: number | GetThemeValueForKey<"size">;
  width?: number | GetThemeValueForKey<"size">;
  type?:
    | "AntDesign"
    | "MaterialCommunityIcons"
    | "MaterialIcons"
    | "SimpleLineIcons"
    | "Ionicons"
    | "FontAwesome"
    | "FontAwesome5"
    | "Octicons";
  style?: ViewStyle;
};

const IconSvg = forwardRef<TamaguiElement, Props>((props, ref) => {
  const { name, type, style, width, height, color, fill, stroke, ...rest } =
    props;
  const IconComponent: ElementType = useMemo(() => {
    const IconSVG = icons?.[name];
    if (name && IconSVG) {
      return IconSVG;
    }
    switch (type) {
      case "MaterialCommunityIcons": {
        return require("react-native-vector-icons/MaterialCommunityIcons")
          .default;
      }
      default: {
        return Stack;
      }
    }
  }, [name, type]);

  const size = useMemo(() => {
    if (width === height) {
      return width;
    }
    return undefined;
  }, [width, height]);

  return (
    <Stack ref={ref} {...rest}>
      <IconComponent
        name={name}
        size={size}
        color={color}
        fill={fill}
        stroke={stroke}
        {...style}
      />
    </Stack>
  );
});
IconSvg.displayName = "IconSvg";

export const Icon = styled(
  IconSvg,
  {
    variants: {
      size: {
        ":number": (size: number, { tokens }: { tokens: Tokens }) => {
          return {
            width:
              tokens?.size?.[size as unknown as keyof typeof tokens.size] ??
              size,
            height:
              tokens?.size?.[size as unknown as keyof typeof tokens.size] ??
              size,
          };
        },
        ":string": (size: string, { tokens }: { tokens: Tokens }) => {
          return {
            width: tokens?.size?.[size as keyof typeof tokens.size] ?? size,
            height: tokens?.size?.[size as keyof typeof tokens.size] ?? size,
          };
        },
      } as const,
    },
  },
  {
    accept: {
      fill: "color",
      stroke: "color",
    } as const,
    acceptsClassName: true,
  }
);
export type IconProps = GetProps<typeof Icon>;

Icon.displayName = "Icon";
