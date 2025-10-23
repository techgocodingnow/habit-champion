import { s } from "@gocodingnow/rn-size-matters";
import { GetThemeValueForKey, XStack, type XStackProps } from "tamagui";
import type { PropsWithChildren, ReactNode } from "react";
import type { OpaqueColorValue } from "react-native";

import { Typography, type TypographyProps } from "../typography";
import { Spinner, type SpinnerProps } from "../spinner";

export type ButtonBaseProps = PropsWithChildren<
  XStackProps & {
    loading?: boolean;
    text?: string;
    tx?: string;
    txOptions?: Record<string, unknown>;
    textProps?: TypographyProps;
    icon?: ReactNode;
    iconAfter?: ReactNode;
    color?: GetThemeValueForKey<"color"> | OpaqueColorValue;
    loadingText?: string;
    loadingTx?: string;
    loadingTxOptions?: Record<string, unknown>;
    loadingProps?: SpinnerProps;
  }
>;
export const ButtonBase = ({
  children,
  tx,
  text,
  loadingText,
  loadingTx,
  loadingTxOptions,
  txOptions,
  textProps,
  color,
  icon,
  iconAfter,
  loading,
  loadingProps,
  ...rest
}: ButtonBaseProps) => {
  return (
    <XStack
      height="$button"
      items="center"
      justify="center"
      rounded="$button"
      px={s(16)}
      gap={s(4)}
      {...rest}
    >
      {icon}
      <Typography
        variant="h4R"
        fontFamilyVariant="primary"
        tx={loading ? loadingTx : tx}
        text={loading ? loadingText : text}
        txOptions={loading ? loadingTxOptions : txOptions}
        color={color}
        {...textProps}
      />
      {iconAfter}
      {loading && <Spinner {...loadingProps} />}
    </XStack>
  );
};
