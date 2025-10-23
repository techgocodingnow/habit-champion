import { ScaledSheet, s } from "@gocodingnow/rn-size-matters";
import map from "lodash-es/map";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import type { LayoutChangeEvent, StyleProp, ViewStyle } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Stack, XStack, type XStackProps } from "tamagui";

import { AnimatedTypography } from "./animated";
import type { TypographyProps } from "./typography";

// Constants
const SEGMENTED_CONTROL_CONSTANTS = {
  BORDER_RADIUS: s(12),
  CONTAINER_PADDING: s(4),
  SLIDER_OFFSET: 4,
  SLIDER_HEIGHT_PERCENTAGE: 0.98,
  SEGMENT_PADDING_VERTICAL: 4,
  SINGLE_ITEM_PADDING: s(8),
  SHADOW_RADIUS: 4,
  SHADOW_OPACITY: 0.25,
  SHADOW_OFFSET_HEIGHT: 4,
} as const;

// Types
type SegmentedControlItem = {
  label?: string;
  labelTx?: string;
};

export type SegmentedControlRef = {
  setActiveIndex: (index: number) => void;
};

type SegmentedControlProps = Omit<XStackProps, "items"> & {
  disabled?: boolean;
  inactiveTextColor?: string;
  activeTextColor?: string;
  activeIndex?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
  slideStyle?: StyleProp<ViewStyle>;
  height?: number;
  autoAnimateSlider?: boolean;
  items: SegmentedControlItem[];
  itemProps?: TypographyProps;
  onMenuChange?: (index: number) => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

// Custom Hooks
const useSegmentedControlAnimation = (
  activeIndex: number,
  items: SegmentedControlItem[],
  tabWidth: number
) => {
  const translateValue = useSharedValue(activeIndex);

  const animateSlider = useCallback(
    (idx: number) => {
      translateValue.value = withTiming(idx * tabWidth);
    },
    [tabWidth, translateValue]
  );

  const highlightStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateValue.value }],
      left: interpolate(
        translateValue.value,
        [0, (items.length - 1) * tabWidth],
        [
          SEGMENTED_CONTROL_CONSTANTS.SLIDER_OFFSET,
          -SEGMENTED_CONTROL_CONSTANTS.SLIDER_OFFSET,
        ]
      ),
    };
  }, [items.length, tabWidth]);

  useEffect(() => {
    if (items.length && activeIndex >= 0) {
      animateSlider(activeIndex);
    }
  }, [activeIndex, animateSlider, items.length]);

  return { translateValue, animateSlider, highlightStyle };
};

const useSegmentedControlLayout = (items: SegmentedControlItem[]) => {
  const [tabWidth, setTabWidth] = useState(0);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      const calculatedWidth =
        (width -
          (items.length > 1
            ? 0
            : SEGMENTED_CONTROL_CONSTANTS.SINGLE_ITEM_PADDING)) /
        items.length;
      setTabWidth(calculatedWidth);
    },
    [items.length]
  );

  return { tabWidth, handleLayout };
};

const useSegmentedControlAccessibility = (
  items: SegmentedControlItem[],
  activeIndex: number,
  accessibilityLabel?: string,
  accessibilityHint?: string
) => {
  const containerAccessibilityProps = useMemo(
    () => ({
      accessible: true,
      accessibilityRole: "tablist" as const,
      accessibilityLabel: accessibilityLabel || "Segmented control",
      accessibilityHint:
        accessibilityHint || `Select from ${items.length} options`,
    }),
    [accessibilityLabel, accessibilityHint, items.length]
  );

  const getSegmentAccessibilityProps = useCallback(
    (index: number) => ({
      accessible: true,
      accessibilityRole: "tab" as const,
      accessibilityState: { selected: index === activeIndex },
      accessibilityLabel:
        items[index]?.label || items[index]?.labelTx || `Option ${index + 1}`,
    }),
    [activeIndex, items]
  );

  return { containerAccessibilityProps, getSegmentAccessibilityProps };
};

export const SegmentedControl = forwardRef<
  SegmentedControlRef,
  SegmentedControlProps
>(
  (
    {
      activeIndex = 0,
      onMenuChange,
      inactiveTextColor = "white",
      activeTextColor = "$primary",
      slideStyle = {},
      items,
      itemProps,
      disabled,
      autoAnimateSlider = true,
      accessibilityLabel,
      accessibilityHint,
      onLayout,
      ...rest
    },
    ref
  ) => {
    const { tabWidth, handleLayout } = useSegmentedControlLayout(items);
    const { animateSlider, highlightStyle } = useSegmentedControlAnimation(
      activeIndex,
      items,
      tabWidth
    );
    const { containerAccessibilityProps, getSegmentAccessibilityProps } =
      useSegmentedControlAccessibility(
        items,
        activeIndex,
        accessibilityLabel,
        accessibilityHint
      );

    useImperativeHandle(
      ref,
      () => ({
        setActiveIndex: (index: number) => {
          animateSlider(index);
        },
      }),
      [animateSlider]
    );

    const handleMenuChange = useCallback(
      (index: number) => {
        onMenuChange?.(index);
        if (autoAnimateSlider) {
          animateSlider(index);
        }
      },
      [onMenuChange, autoAnimateSlider, animateSlider]
    );

    const combinedOnLayout = useCallback(
      (event: LayoutChangeEvent) => {
        handleLayout(event);
        onLayout?.(event);
      },
      [handleLayout, onLayout]
    );

    if (items.length) {
      return (
        <XStack
          rounded={SEGMENTED_CONTROL_CONSTANTS.BORDER_RADIUS}
          bg="$segmented_control_bg"
          height="$segmented_control"
          items="center"
          px={SEGMENTED_CONTROL_CONSTANTS.CONTAINER_PADDING}
          onLayout={combinedOnLayout}
          style={styles.container}
          {...containerAccessibilityProps}
          {...rest}
        >
          <Animated.View
            style={[
              highlightStyle,
              {
                position: "absolute",
                height: `${
                  SEGMENTED_CONTROL_CONSTANTS.SLIDER_HEIGHT_PERCENTAGE * 100
                }%`,
                width: tabWidth,
                borderRadius: SEGMENTED_CONTROL_CONSTANTS.BORDER_RADIUS,
                backgroundColor: "white",
              },
              slideStyle,
            ]}
          />

          {map(items, (item, index) => (
            <Stack
              key={index}
              flex={1}
              py={SEGMENTED_CONTROL_CONSTANTS.SEGMENT_PADDING_VERTICAL}
              onPress={() => handleMenuChange(index)}
              disabled={disabled}
              {...getSegmentAccessibilityProps(index)}
            >
              <AnimatedTypography
                color={
                  index === activeIndex
                    ? "$segmented_control_text_active"
                    : "$segmented_control_text_inactive"
                }
                text={item.label}
                tx={item.labelTx}
                variant="h5M"
                textAlign="center"
                {...itemProps}
              />
            </Stack>
          ))}
        </XStack>
      );
    }
    return null;
  }
);

SegmentedControl.displayName = "SegmentedControl";
const styles = ScaledSheet.create({
  container: {
    shadowColor: "black",
    shadowRadius: SEGMENTED_CONTROL_CONSTANTS.SHADOW_RADIUS,
    shadowOpacity: SEGMENTED_CONTROL_CONSTANTS.SHADOW_OPACITY,
    shadowOffset: {
      width: 0,
      height: SEGMENTED_CONTROL_CONSTANTS.SHADOW_OFFSET_HEIGHT,
    },
    elevation: 0,
  },
});
