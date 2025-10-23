import {
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { type LayoutChangeEvent, StyleSheet, View } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";
import { Stack, XStack } from "tamagui";

const MeasureElement = ({
  children,
  onLayout,
}: PropsWithChildren<{ onLayout: (width: number) => void }>) => {
  return (
    <Animated.ScrollView
      style={styles.hidden}
      horizontal
      pointerEvents="box-none"
    >
      <View onLayout={(ev) => onLayout(ev.nativeEvent.layout.width)}>
        {children}
      </View>
    </Animated.ScrollView>
  );
};

const TranslatedElement = ({
  index,
  children,
  offset,
  childrenWidth,
}: PropsWithChildren<{
  index: number;
  offset: SharedValue<number>;
  childrenWidth: number;
}>) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: (index - 1) * childrenWidth,
      transform: [
        {
          translateX: -offset.value,
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.animatedStyle, animatedStyle]}>
      {children}
    </Animated.View>
  );
};
const getIndicesArray = (length: number) => Array.from({ length }, (_, i) => i);

const Cloner = ({
  count,
  renderChild,
}: {
  count: number;
  renderChild: (index: number) => ReactNode;
}) => <>{getIndicesArray(count).map(renderChild)}</>;

const ChildrenScroller = ({
  children,
  duration,
  parentWidth,
  childrenWidth,
  reverse,
}: PropsWithChildren<{
  duration: number;
  parentWidth: number;
  childrenWidth: number;
  reverse: boolean;
}>) => {
  const offset = useSharedValue(0);
  const coeff = useSharedValue(reverse ? 1 : -1);

  useEffect(() => {
    coeff.value = reverse ? 1 : -1;
  }, [reverse]);

  useFrameCallback(({ timeSincePreviousFrame }) => {
    offset.value +=
      (coeff.value * ((timeSincePreviousFrame ?? 1) * childrenWidth)) /
      duration;
    offset.value = offset.value % childrenWidth;
  }, true);

  const count = Math.round(parentWidth / childrenWidth) + 2;
  const renderChild = (index: number) => (
    <TranslatedElement
      key={`clone-${index}`}
      index={index}
      offset={offset}
      childrenWidth={childrenWidth}
    >
      {children}
    </TranslatedElement>
  );

  return <Cloner count={count} renderChild={renderChild} />;
};

export const Marquee = ({
  duration = 10000,
  reverse = false,
  children,
}: PropsWithChildren<{ duration?: number; reverse?: boolean }>) => {
  const [parentWidth, setParentWidth] = useState(0);
  const [childrenWidth, setChildrenWidth] = useState(0);

  return (
    <Stack
      pointerEvents="box-none"
      onLayout={({ nativeEvent }: LayoutChangeEvent) =>
        setParentWidth(nativeEvent.layout.width)
      }
    >
      <XStack pointerEvents="box-none">
        <MeasureElement onLayout={setChildrenWidth}>{children}</MeasureElement>

        {childrenWidth > 0 && parentWidth > 0 && (
          <ChildrenScroller
            duration={duration}
            parentWidth={parentWidth}
            childrenWidth={childrenWidth}
            reverse={reverse}
          >
            {children}
          </ChildrenScroller>
        )}
      </XStack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  animatedStyle: {
    position: "absolute",
  },
  hidden: {
    opacity: 0,
    zIndex: -1,
  },
});
