import { s } from "@gocodingnow/rn-size-matters";
import { useStyle } from "@tamagui/core";
import { XStack } from "@tamagui/stacks";
import { useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import ReanimatedSwipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Typography } from "./ui/typography";

const RightAction = (props: {
  text: string;
  color: string;
  x: number;
  progress: SharedValue<number>;
  onPress: () => void;
  close: () => void;
}) => {
  const { text, color, x, progress, onPress, close } = props;
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(progress.value, [0, 1], [x, 0]),
        },
      ],
    };
  });
  const pressHandler = () => {
    close();
    onPress();
  };

  return (
    <Animated.View style={[{ flex: 1 }, styleAnimation]}>
      <RectButton
        style={[styles.rightAction, { backgroundColor: color }]}
        onPress={pressHandler}
      >
        <Typography style={styles.actionText} value={text} />
      </RectButton>
    </Animated.View>
  );
};

type HistoryItemProps = {
  data: any;
};
export const HabitCard = ({ data }: HistoryItemProps) => {
  const ref = useRef<SwipeableMethods>(null);

  const _onPress = () => {};

  const _onDelete = () => {
    if (data.id) {
    }
  };

  const _onToggleBookmark = () => {
    if (data.id) {
    }
  };

  const close = () => {
    ref.current?.close();
  };

  const renderRightActions = (
    progress: SharedValue<number>,
    _dragAnimatedValue: SharedValue<number>
  ) => (
    <XStack width={128} justify="flex-end">
      <RightAction
        text="Flag"
        color="#ffab00"
        x={128}
        progress={progress}
        onPress={_onToggleBookmark}
        close={close}
      />
      <RightAction
        text="Delete"
        color="#dd2c00"
        x={64}
        progress={progress}
        onPress={_onDelete}
        close={close}
      />
    </XStack>
  );

  const containerStyle = useStyle(
    {
      backgroundColor: "$card_bg",
      height: 60,
      px: "$list_item_horizontal",
      jc: "center",
    },
    {
      resolveValues: "value",
    }
  );
  return (
    <ReanimatedSwipeable
      ref={ref}
      containerStyle={containerStyle}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
      <XStack
        bg="$card_bg"
        rounded="$card"
        px="$card_horizontal"
        py="$card_vertical"
        mb="$gap_vertical"
        mx="$container"
        items="center"
        gap="$gap_list_item"
        onPress={_onPress}
      >
        <Typography value={`Habit Card ${data.id}`} />
      </XStack>
    </ReanimatedSwipeable>
  );
};

const styles = StyleSheet.create({
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  separator: {
    width: "100%",
    borderTopWidth: 1,
  },
});
