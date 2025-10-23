import { s, vs } from "@gocodingnow/rn-size-matters";
import { Stack, type StackProps, XStack, type XStackProps } from "tamagui";
import {
  createContext,
  memo,
  type PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Icon, type IconName } from "./icon";
import { Typography } from "./typography";
import { FullWindowOverlay } from "react-native-screens";

/**
 * Animation configuration for floating action button
 */
interface AnimationConfig {
  spring: {
    duration: number;
    overshootClamping: boolean;
    dampingRatio: number;
  };
  itemOffset: number;
  itemDelay: number;
}

/**
 * Animation constants with optimized values for smooth performance
 */
const _ANIMATION_CONFIG: AnimationConfig = {
  spring: {
    duration: 1200,
    overshootClamping: true,
    dampingRatio: 0.8,
  },
  itemOffset: 60,
  itemDelay: 100,
};

// Animated components
const AnimatedXStack = Animated.createAnimatedComponent(XStack);
const AnimatedTypography = Animated.createAnimatedComponent(Typography);

/**
 * Context type for floating action button state management
 */
interface FloatingActionButtonContextType {
  isExpanded: SharedValue<boolean>;
  toggle: () => void;
  expand: () => void;
  collapse: () => void;
  animationConfig: AnimationConfig;
  handlePress: () => void;
}

const FloatingActionButtonContext =
  createContext<FloatingActionButtonContextType | null>(null);

/**
 * Hook to access floating action button context
 * @throws {Error} When used outside of FloatingActionButton provider
 */
const useFloatingActionButtonContext = (): FloatingActionButtonContextType => {
  const context = useContext(FloatingActionButtonContext);
  if (!context) {
    throw new Error(
      "useFloatingActionButtonContext must be used within a FloatingActionButton"
    );
  }
  return context;
};

/**
 * Custom hook for floating item animation logic
 */
const useFloatingItemAnimation = (
  index: number,
  isExpanded: SharedValue<boolean>,
  config: AnimationConfig
) => {
  const itemStyle = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? config.itemOffset * index : 0;
    const translateValue = withSpring(-moveValue, config.spring);
    const delay = index * config.itemDelay;
    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateY: translateValue },
        { scale: withDelay(delay, withTiming(scaleValue)) },
      ],
    };
  });

  const textStyle = useAnimatedStyle(() => ({
    opacity: isExpanded.value ? 1 : 0,
  }));

  return {
    itemStyle,
    textStyle,
  };
};

/**
 * Improved icon type for better type safety
 */
type IconProp = IconName | React.ReactElement;

/**
 * Props for FloatingActionButton.Item component
 */
interface FloatingActionButtonItemProps extends Omit<XStackProps, "children"> {
  /** Index for animation timing */
  index: number;
  /** Text to display */
  value?: string;
  /** Translation key for text */
  tx?: string;
  /** Icon to display */
  icon?: IconProp;
  /** Press handler */
  onPress?: () => void;
}

/**
 * Individual floating action button item with optimized animations
 */
const FloatingActionButtonItem = memo<FloatingActionButtonItemProps>(
  ({ index, tx, value, icon, onPress, ...props }) => {
    const { isExpanded, animationConfig } = useFloatingActionButtonContext();
    const { itemStyle, textStyle } = useFloatingItemAnimation(
      index,
      isExpanded,
      animationConfig
    );

    return (
      <AnimatedXStack
        gap={10}
        position="absolute"
        items="center"
        justify="center"
        r={0}
        width={s(120)}
        py={vs(8)}
        px={s(8)}
        style={[itemStyle, styles.shadow]}
        onPress={onPress}
        z={1000}
        bg="rgba(104, 30, 8, 0.8)"
        rounded={100}
        {...props}
      >
        <AnimatedTypography
          style={textStyle}
          value={value}
          tx={tx}
          text="center"
          variant="h3B"
          color="$text_secondary"
        />
        {typeof icon === "string" ? <Icon name={icon as IconName} /> : icon}
      </AnimatedXStack>
    );
  }
);

FloatingActionButtonItem.displayName = "FloatingActionButtonItem";

// Trigger Component
const FloatingActionButtonTrigger = memo<PropsWithChildren>(({ children }) => {
  const { handlePress, isExpanded } = useFloatingActionButtonContext();

  const plusIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(isExpanded.value ? 1.2 : 1) }],
  }));

  return (
    <AnimatedXStack
      z={1}
      items="center"
      justify="center"
      onPress={handlePress}
      style={[styles.shadow]}
    >
      <Animated.View style={plusIconStyle}>{children}</Animated.View>
    </AnimatedXStack>
  );
});

FloatingActionButtonTrigger.displayName = "FloatingActionButtonTrigger";

// Main Component
type FloatingActionButtonProps = PropsWithChildren<
  StackProps & {
    onActive?: () => void;
    onClose?: () => void;
  }
>;

export const FloatingActionButton = ({
  children,
  onActive,
  onClose,
  ...rest
}: FloatingActionButtonProps) => {
  const isExpanded = useSharedValue(false);
  const [expanded, setExpanded] = useState(false);

  const handlePress = useCallback(() => {
    const newValue = !isExpanded.value;
    isExpanded.value = newValue;
    setExpanded(newValue);

    if (newValue) {
      onActive?.();
    } else {
      onClose?.();
    }
  }, [isExpanded, onActive, onClose]);

  const expand = useCallback(() => {
    isExpanded.value = true;
    setExpanded(true);
    onActive?.();
  }, [isExpanded, onActive]);

  const collapse = useCallback(() => {
    isExpanded.value = false;
    setExpanded(false);
    onClose?.();
  }, [isExpanded, onClose]);

  return (
    <FloatingActionButtonContext.Provider
      value={{
        isExpanded,
        toggle: handlePress,
        expand,
        collapse,
        animationConfig: _ANIMATION_CONFIG,
        handlePress,
      }}
    >
      {expanded ? (
        <FullWindowOverlay>
          <TouchableWithoutFeedback
            accessible
            accessibilityRole="button"
            accessibilityLabel="Close floating menu"
            onPress={collapse}
          >
            <Stack flex={1}>
              <Stack {...rest}>{children}</Stack>
              <View style={styles.backdrop} />
            </Stack>
          </TouchableWithoutFeedback>
        </FullWindowOverlay>
      ) : (
        <Stack {...rest}>{children}</Stack>
      )}
    </FloatingActionButtonContext.Provider>
  );
};

FloatingActionButton.Trigger = FloatingActionButtonTrigger;
FloatingActionButton.Item = FloatingActionButtonItem;
FloatingActionButton.displayName = "FloatingActionButton";

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
