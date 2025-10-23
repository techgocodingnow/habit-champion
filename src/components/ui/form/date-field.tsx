import { s } from "@gocodingnow/rn-size-matters";
import { Stack } from "@tamagui/core";
import { XStack } from "@tamagui/stacks";
import { useState } from "react";
import DatePicker, { type DatePickerProps } from "react-native-date-picker";
import { DateTime } from "luxon";
import { Typography } from "../typography";

interface DateFieldProps
  extends Omit<DatePickerProps, "date" | "onDateChange"> {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholderTx?: string;
  disabled?: boolean;
}

export function DateField({
  mode,
  value,
  onChange,
  placeholderTx,
  disabled,
}: DateFieldProps) {
  const [open, setOpen] = useState(false);

  const hasValue = !!value;
  return (
    <Stack disabled={disabled}>
      <XStack
        onPress={() => {
          setOpen(true);
        }}
        pl="$input"
        pr="$input"
        height={48}
        items="center"
        borderWidth={1}
        gap={s(4)}
        rounded="$input"
        overflow="hidden"
        borderColor="$input_border_default"
        focusStyle={{ borderColor: "$input_border_active" }}
        bg={disabled ? "$input_bg_disabled" : "$input_bg_default"}
      >
        <Typography
          color={
            disabled
              ? "$input_text_disabled"
              : hasValue
              ? "$input_text_default"
              : "$input_placeholder_default"
          }
          tx={placeholderTx}
          value={
            value
              ? DateTime.fromJSDate(value).toFormat(
                  mode === "time" ? "H:mm a" : "MMM dd, yyyy"
                )
              : undefined
          }
          variant="h4R"
        />
      </XStack>
      <DatePicker
        modal
        theme="light"
        mode={mode}
        minimumDate={DateTime.fromJSDate(new Date())
          .minus({ years: 150 })
          .toJSDate()}
        maximumDate={new Date()}
        open={open}
        date={value ?? new Date()}
        onConfirm={(date) => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </Stack>
  );
}
