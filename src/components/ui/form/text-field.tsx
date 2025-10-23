import { s } from "@gocodingnow/rn-size-matters";
import { type ColorTokens, Stack, XStack, type XStackProps } from "tamagui";
import { Input } from "tamagui";
import { forwardRef, type ReactNode, type Ref, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import type { TextInput, TextInputProps } from "react-native";

import { Typography } from "../typography";
import { baseFontName } from "@/src/styles/theme/fonts";

export type TextFieldProps = XStackProps &
  TextInputProps & {
    prefix?: string | ReactNode;
    suffix?: string | ReactNode;
    placeholderTx?: string;
    placeholderTxOptions?: Record<string, string>;
    variant?: "default";
    containerProps?: XStackProps;
    placeholderTextColor?: ColorTokens;
    selectionColor?: ColorTokens;
    type?: "text" | "password";
  };
export const TextField = forwardRef(
  (
    {
      variant = "default",
      prefix,
      suffix,
      placeholderTx,
      placeholderTxOptions,
      placeholder,
      width,
      containerProps,
      disabled,
      height = 48,
      minH,
      maxH,
      minW,
      maxW,
      ...props
    }: TextFieldProps,
    ref: Ref<TextInput>
  ) => {
    const { t } = useTranslation();

    const placeholderText = placeholder
      ? placeholder
      : placeholderTx
      ? t(placeholderTx, placeholderTxOptions)
      : "";

    return (
      <XStack
        onPress={() => {
          (ref as unknown as RefObject<TextInput>)?.current?.focus();
        }}
        px="$input"
        // height={48}
        items="center"
        borderWidth={1}
        borderColor="$input_border_default"
        focusStyle={{ borderColor: "$input_border_active" }}
        bg={disabled ? "$input_bg_disabled" : "$input_bg_default"}
        gap={s(4)}
        rounded="$input"
        width={width}
        overflow="hidden"
        height={height}
        minH={minH}
        maxH={maxH}
        minW={minW}
        maxW={maxW}
        {...containerProps}
      >
        {prefix ? (
          <Stack>
            {typeof prefix === "string" ? (
              <Typography fontSize="$16">{prefix}</Typography>
            ) : (
              prefix
            )}
          </Stack>
        ) : null}

        <Input
          ref={ref}
          placeholderTextColor="$input_placeholder_default"
          selectionColor="$input_cursor"
          cursorColor="$input_cursor"
          verticalAlign="middle"
          autoCorrect={false}
          spellCheck={false}
          placeholder={placeholderText}
          editable={!disabled}
          disabled={disabled}
          color="$input_text_default"
          disabledStyle={{
            color: "$input_text_disabled",
          }}
          px={0}
          rounded={0}
          borderWidth={0}
          fontSize="$16"
          fontFamily={baseFontName}
          flex={1}
          backgroundColor="transparent"
          height="100%"
          {...(props as any)}
        />

        {suffix ? (
          <Stack>
            {typeof suffix === "string" ? (
              <Typography fontSize="$16">{suffix}</Typography>
            ) : (
              suffix
            )}
          </Stack>
        ) : null}
      </XStack>
    );
  }
);

TextField.displayName = "TextField";
