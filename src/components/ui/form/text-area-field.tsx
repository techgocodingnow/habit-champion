import { vs } from "@gocodingnow/rn-size-matters";
import type { ColorTokens, StackProps } from "tamagui";
import { TextArea } from "tamagui";
import { forwardRef, type Ref, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { TextInput, TextInputProps } from "react-native";

import { Typography } from "../typography";
import { baseFontName } from "@/src/styles/theme/fonts";

export type TextAreaFieldProps = TextInputProps & {
  disabled?: boolean;
  placeholderTx?: string;
  placeholderTxOptions?: Record<string, string>;
  placeholderTextColor?: ColorTokens;
  selectionColor?: ColorTokens;
  color?: ColorTokens;
  showWordCount?: boolean;
} & StackProps;
export const TextAreaField = forwardRef(
  (
    {
      placeholderTx,
      placeholderTxOptions,
      placeholder,
      style,
      disabled,
      value,
      showWordCount,
      maxLength,
      ...props
    }: TextAreaFieldProps,
    ref: Ref<TextInput>
  ) => {
    const { t } = useTranslation();
    const [letterCount, setLetterCount] = useState(0);

    const placeholderText = placeholder
      ? placeholder
      : placeholderTx
      ? t(placeholderTx, placeholderTxOptions)
      : "";

    useEffect(() => {
      setLetterCount(value?.length ?? 0);
    }, [value]);

    return (
      <>
        <TextArea
          multiline
          ref={ref}
          value={value}
          minH={48}
          spellCheck={true}
          placeholder={placeholderText}
          editable={!disabled}
          disabled={disabled}
          placeholderTextColor="$input_placeholder_default"
          selectionColor="$input_cursor"
          cursorColor="$input_cursor"
          verticalAlign="top"
          rounded="$input"
          bg="$input_bg_default"
          p="$input"
          borderWidth={1}
          borderColor="$input_border_default"
          disabledStyle={{
            bg: "$input_bg_disabled",
          }}
          focusStyle={{
            borderColor: "$input_border_active",
          }}
          color={disabled ? "$input_text_disabled" : "$input_text_default"}
          maxLength={maxLength}
          autoCorrect={true}
          fontSize="$16"
          fontFamily={baseFontName}
          flex={1}
          {...(props as any)}
        />
        {showWordCount && (
          <Typography
            mt={vs(4)}
            variant="h6R"
            color="$text_primary"
            text="right"
            value={`${letterCount}/${maxLength}`}
          />
        )}
      </>
    );
  }
);

TextAreaField.displayName = "TextAreaField";
