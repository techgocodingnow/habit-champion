import { s, vs } from "@gocodingnow/rn-size-matters";
import { useNavigation } from "@react-navigation/native";
import type { ReactNode } from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { StackProps, XStackProps } from "tamagui";
import { Stack, XStack } from "tamagui";

import type { IconName, IconProps } from "./icon";
import { Icon } from "./icon";
import type { TypographyProps } from "./typography";
import { Typography } from "./typography";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export type HeaderProps = {
  title?: string;
  titleTx?: string;
  titleTxOptions?: Record<string, string | number>;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  iconLeft?: IconName | boolean | null;
  iconRight?: string | boolean;
  leftComponent?: ReactNode;
  centerComponent?: ReactNode;
  rightComponent?: ReactNode;
  titleProps?: Omit<TypographyProps, "ref">;
  safeAreaTop?: boolean;
  leftProps?: StackProps;
  rightProps?: StackProps;
  iconLeftProps?: Omit<IconProps, "name">;
  iconRightProps?: Omit<IconProps, "name">;
} & XStackProps;

export const Header = ({
  iconLeft,
  iconRight,
  title,
  titleTx,
  titleTxOptions,
  onLeftPress,
  onRightPress,
  leftComponent,
  centerComponent,
  rightComponent,
  leftProps,
  rightProps,
  iconLeftProps,
  iconRightProps,
  titleProps,
  safeAreaTop = true,
  ...rest
}: HeaderProps) => {
  const navigation = useNavigation();
  const areaInsets = useSafeAreaInsets();

  return (
    <XStack
      z={1000}
      // In android, header is so close to the status bar, so we need to add a small padding to the top
      pt={
        safeAreaTop
          ? Platform.select({
              ios: areaInsets.top,
              android: areaInsets.top + vs(8),
            })
          : 0
      }
      px={s(16)}
      pb={vs(14)}
      justify="space-between"
      items="center"
      width="100%"
      bg="$header_bg"
      {...rest}
    >
      <Stack
        testID={`header_btn_${iconLeft}`}
        width={s(50)}
        onPress={onLeftPress || navigation.goBack}
        justify="flex-start"
        {...leftProps}
      >
        {leftComponent ? (
          leftComponent
        ) : iconLeft ? (
          <Icon
            name={iconLeft as IconName}
            width={s(24)}
            height={s(24)}
            color="$primary"
            {...iconLeftProps}
          />
        ) : (
          <Stack />
        )}
      </Stack>
      <Stack flex={1}>
        {centerComponent ? (
          centerComponent
        ) : (
          <Typography
            value={title}
            tx={titleTx}
            txOptions={titleTxOptions}
            numberOfLines={1}
            text="center"
            fontFamilyVariant="primary"
            color="$header_title"
            maxFontSizeScale={1.3}
            {...titleProps}
          />
        )}
      </Stack>

      <Stack
        testID={`header_btn_${iconRight}`}
        width={s(50)}
        justify="flex-end"
        items="flex-end"
        onPress={onRightPress}
        {...rightProps}
      >
        {rightComponent ? (
          rightComponent
        ) : iconRight ? (
          <Icon
            name={iconRight as IconName}
            color="$primary"
            {...iconRightProps}
          />
        ) : (
          <Stack />
        )}
      </Stack>
    </XStack>
  );
};
