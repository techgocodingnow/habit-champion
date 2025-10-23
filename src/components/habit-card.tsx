import { useStyle, XStack, Stack } from "tamagui";
import { useRef } from "react";
import { I18nManager, StyleSheet } from "react-native";
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
import Icon from "@expo/vector-icons/MaterialIcons";
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const RightAction = (props: {
  x: number;
  progress: SharedValue<number>;
  onPress: () => void;
  close: () => void;
}) => {
  const { x, progress, onPress, close } = props;
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
    <Stack width={128}>
      <Animated.View
        style={[{ flex: 1, flexDirection: "row" }, styleAnimation]}
      >
        <RectButton
          style={[
            styles.rightAction,
            {
              backgroundColor: "#dd2c00",
            },
          ]}
          onPress={pressHandler}
        >
          <Typography style={styles.actionText} tx="delete" color="white" />
        </RectButton>
        <RectButton
          style={[styles.rightAction, { backgroundColor: "#ffab00" }]}
          onPress={pressHandler}
        >
          <Typography style={styles.actionText} tx="undo" color="white" />
        </RectButton>
      </Animated.View>
    </Stack>
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
    <RightAction
      x={128}
      progress={progress}
      onPress={_onDelete}
      close={close}
    />
  );

  const containerStyle = useStyle(
    {
      height: 60,
    },
    {
      resolveValues: "value",
    }
  );

  const renderLeftActions = (
    progress: SharedValue<number>,
    dragX: SharedValue<number>
  ) => {
    const scale = interpolate(dragX.value, [0, 60], [0, 1], "clamp");
    return (
      <RectButton
        style={{
          flex: 1,
          backgroundColor: "#388e3c",
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
        }}
        onPress={close}
      >
        <AnimatedIcon
          name="archive"
          color="#fff"
          style={[
            {
              marginHorizontal: 10,
            },
            { transform: [{ scale }] },
          ]}
        />
      </RectButton>
    );
  };
  return (
    <Stack mb={16}>
      <ReanimatedSwipeable
        ref={ref}
        containerStyle={containerStyle}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
      >
        <XStack
          bg="$card_bg"
          rounded="$card"
          px="$card_horizontal"
          height={60}
          items="center"
          gap="$gap_list_item"
          onPress={_onPress}
        >
          <Typography value={`Habit Card ${data.id}`} />
        </XStack>
      </ReanimatedSwipeable>
    </Stack>
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
    justifyContent: "center",
  },
  separator: {
    width: "100%",
    borderTopWidth: 1,
  },
});
