import { ActivityIndicator } from "react-native";
import type { StackProps } from "tamagui";
import { Stack, useStyle } from "tamagui";

export type SpinnerProps = StackProps & {
  center?: boolean;
  full?: boolean;
  animating?: boolean;
  size?: "small" | "large" | number;
  color?: string;
};
export const Spinner = ({
  full,
  center,
  animating,
  size,
  color,
  ...props
}: SpinnerProps) => {
  const indicatorColor = useStyle(
    {
      color: "$primary",
    },
    {
      resolveValues: "value",
    }
  );

  return (
    <Stack
      flex={full ? 1 : "unset"}
      justify={center ? "center" : "unset"}
      items={center ? "center" : "unset"}
      {...props}
    >
      <ActivityIndicator
        animating={animating}
        size={size}
        color={indicatorColor.color}
      />
    </Stack>
  );
};
