import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StatusBar, StyleSheet } from "react-native";
import {
  KeyboardAvoidingView,
  type KeyboardAvoidingViewProps,
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { ScrollViewProps, StackProps } from "tamagui";
import { ScrollView, Stack } from "tamagui";

import { Header } from "./header";

const ScreenContext = createContext({
  variant: "fixed",
});
type ScreenProps = StackProps & {
  variant?: "fixed" | "scroll-keyboard" | "scroll" | "fixed-keyboard";
  barStyle?: "light-content" | "dark-content";
  safeAreaTop?: boolean;
  safeAreaBottom?: boolean;
};
export const Screen = ({
  variant = "fixed",
  barStyle = "light-content",
  children,
  safeAreaTop = false,
  safeAreaBottom = false,
  ...rest
}: ScreenProps) => {
  const areaInsets = useSafeAreaInsets();
  return (
    <ScreenContext.Provider value={{ variant }}>
      <StatusBar
        barStyle={barStyle}
        translucent
        backgroundColor="transparent"
      />
      <Stack
        flex={1}
        pt={safeAreaTop ? areaInsets.top : 0}
        pb={safeAreaBottom ? areaInsets.bottom : 0}
        {...rest}
      >
        {children}
      </Stack>
    </ScreenContext.Provider>
  );
};

type ScreenContainerProps =
  | KeyboardAvoidingViewProps
  | (KeyboardAwareScrollViewProps & {
      style?: StyleProp<ViewStyle>;
      children?: ReactNode;
    })
  | ScrollViewProps
  | StackProps;
const ScreenContainer = ({
  style,
  children,
  ...rest
}: ScreenContainerProps) => {
  const { variant } = useContext(ScreenContext);

  if (variant === "scroll") {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        {...(rest as ScrollViewProps)}
      >
        {children}
      </ScrollView>
    );
  }

  if (variant === "fixed-keyboard") {
    return (
      <KeyboardAvoidingView
        style={StyleSheet.flatten([styles.container, style] as any)}
        {...(rest as KeyboardAvoidingViewProps)}
      >
        {children}
      </KeyboardAvoidingView>
    );
  }

  if (variant === "scroll-keyboard") {
    return (
      <KeyboardAwareScrollView
        style={StyleSheet.flatten([styles.container, style] as any)}
        showsVerticalScrollIndicator={false}
        {...(rest as KeyboardAwareScrollViewProps)}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  }
  return (
    <Stack flex={1} style={style as any} {...(rest as StackProps)}>
      {children}
    </Stack>
  );
};

type ScreenBodyProps = StackProps;
const ScreenBody = ({ children, ...rest }: ScreenBodyProps) => {
  return <Stack {...rest}>{children}</Stack>;
};

Screen.Header = Header;
Screen.Container = ScreenContainer;
Screen.Body = ScreenBody;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    height: "100%",
  },
});
