import { s, vs } from "@gocodingnow/rn-size-matters";
import { Stack, XStack } from "tamagui";
import { Pressable } from "react-native";

type RadioGroupProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  gap?: number;
  children?: React.ReactNode;
};

export const RadioGroup = ({ gap, children }: RadioGroupProps) => {
  return <Stack gap={gap}>{children}</Stack>;
};

type RadioItemProps = {
  value: string;
  selected?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
};

export const RadioItem = ({ selected, onPress, children }: RadioItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <XStack
        items="center"
        gap={s(16)}
        px={s(16)}
        py={vs(16)}
        borderWidth={1}
        rounded={100}
        borderColor={
          selected ? "$radio_border_active" : "$radio_border_inactive"
        }
      >
        <Stack
          width={s(20)}
          height={s(20)}
          rounded={100}
          borderWidth={2}
          borderColor={
            selected ? "$radio_border_active" : "$radio_border_inactive"
          }
          items="center"
          justify="center"
        >
          {selected && (
            <Stack
              width={s(12)}
              height={s(12)}
              rounded={100}
              bg="$radio_indicator"
            />
          )}
        </Stack>
        {children}
      </XStack>
    </Pressable>
  );
};
