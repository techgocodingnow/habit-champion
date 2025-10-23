import Animated from "react-native-reanimated";
import { Stack, XStack } from "tamagui";

import { Typography } from "./typography";

export const AnimatedStack = Animated.createAnimatedComponent(Stack);
export const AnimatedXStack = Animated.createAnimatedComponent(XStack);
export const AnimatedTypography = Animated.createAnimatedComponent(Typography);
