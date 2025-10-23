import { type GetThemeValueForKey, Stack } from "tamagui";
import { memo, useEffect, useRef } from "react";
import { Animated, type OpaqueColorValue, type ViewStyle } from "react-native";

interface VerticalStickProps {
  focusColor?: OpaqueColorValue | GetThemeValueForKey<"backgroundColor">;
  style?: ViewStyle;
  focusStickBlinkingDuration?: number;
}

export const VerticalStick: React.FC<VerticalStickProps> = memo(
  ({ focusColor, style, focusStickBlinkingDuration = 350 }) => {
    const opacityAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 0,
            useNativeDriver: true,
            duration: focusStickBlinkingDuration,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            useNativeDriver: true,
            duration: focusStickBlinkingDuration,
          }),
        ]),
        {
          iterations: -1,
        }
      ).start();
    }, []);

    return (
      <Animated.View style={{ opacity: opacityAnim }}>
        <Stack
          width={2}
          height={30}
          bg={focusColor ? focusColor : "$input_cursor"}
          style={style}
          testID="otp-input-stick"
        />
      </Animated.View>
    );
  }
);

VerticalStick.displayName = "VerticalStick";
