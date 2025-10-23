import { Stack, XStack } from "tamagui";
import { type ReactNode, useRef } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { Typography } from "../typography";
import { Icon } from "../icon";

type SelectFieldProps = {
  items: {
    labelTx?: string;
    label?: string;
    value: string | number;
  }[];
  onValueChange: (value: string) => void;
  value?: string | number | null;
  placeholderTx?: string;
  placeholder?: string;
  placeholderTxOptions?: {
    [key: string]: string;
  };
  disabled?: boolean;
  suffix?: string | ReactNode;
  suffixTx?: string;
  suffixTxOptions?: {
    [key: string]: string;
  };
  prefix?: string | ReactNode;
  prefixTx?: string;
  prefixTxOptions?: {
    [key: string]: string;
  };
};

export const SelectField = ({
  disabled,
  items,
  onValueChange,
  placeholderTx,
  placeholder,
  value,
  placeholderTxOptions,
  suffix,
  suffixTx,
  suffixTxOptions,
  prefix,
  prefixTx,
  prefixTxOptions,
}: SelectFieldProps) => {
  const { t } = useTranslation();
  const pickerRef = useRef<RNPickerSelect>(null);

  const selectedItem = items.find((item) => item.value === value);

  const _renderSuffix = () => {
    if (suffixTx || typeof suffix === "string") {
      return (
        <Typography
          value={suffix as string}
          tx={suffixTx}
          txOptions={suffixTxOptions}
          color={disabled ? "$input_text_disabled" : "$input_text_default"}
        />
      );
    }
    return <Icon name="chevron-down" size={24} color="$input_text_default" />;
  };

  const _renderPrefix = () => {
    if (prefixTx || typeof prefix === "string") {
      return (
        <Typography
          value={prefix as string}
          tx={prefixTx}
          txOptions={prefixTxOptions}
          color={disabled ? "$input_text_disabled" : "$input_text_default"}
        />
      );
    }
    return prefix;
  };

  const formattedItems = items.map((item) => ({
    label: (item.labelTx ? t(item.labelTx) : item.label) as string,
    value: item.value,
  }));

  const hasValue = !!selectedItem?.label || !!selectedItem?.labelTx;
  return (
    <Stack>
      <XStack
        borderWidth={1}
        borderColor="$input_border_default"
        focusStyle={{ borderColor: "$input_border_active" }}
        bg={disabled ? "$input_bg_disabled" : "$input_bg_default"}
        rounded="$input"
        height={48}
        px="$input"
        items="center"
        justify="space-between"
        disabled={disabled}
        onPress={() => pickerRef.current?.togglePicker()}
      >
        {_renderPrefix()}

        <Typography
          value={selectedItem?.label ?? placeholder}
          tx={selectedItem?.labelTx ?? placeholderTx}
          txOptions={placeholderTxOptions}
          color={
            disabled
              ? "$input_text_disabled"
              : hasValue
              ? "$input_text_default"
              : "$input_placeholder_default"
          }
        />

        {_renderSuffix()}
      </XStack>
      <RNPickerSelect
        disabled={disabled}
        ref={pickerRef}
        value={value}
        onValueChange={onValueChange}
        items={formattedItems}
      >
        <View />
      </RNPickerSelect>
    </Stack>
  );
};
