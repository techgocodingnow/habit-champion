import { type GetThemeValueForKey, Stack } from "tamagui";
import { XStack } from "tamagui";
import type React from "react";
import {
  createContext,
  createRef,
  type Ref,
  type RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  OpaqueColorValue,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";
import type { LinearTransition } from "react-native-reanimated";
import Animated, {
  FadeInDown,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { VerticalStick } from "./vertical-stick";

export interface IOtpInput extends TextInputProps {
  disabled?: boolean;

  /**
   * Digits of pins in the OTP
   */
  otpCount: number;
  /**
   * Style of the input container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style of the input fields
   */
  inputStyle?: StyleProp<TextStyle>;
  /**
   * Style of text for input fields
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Color of border color when focused
   */
  focusColor?: OpaqueColorValue | GetThemeValueForKey<"backgroundColor">;
  /**
   * If keyboard is automatically brought up when OTP is loaded.
   */
  autoFocus?: boolean;
  /**
   * Set editable for inputs
   */
  editable?: boolean;
  /**
   * Callback function
   * Trigger when all text input fields are fulfill
   */
  onCodeFilled?: (code: string) => void;
  /**
   * Callback function
   * Trigger when a field of the OTP is changed
   */
  onCodeChanged?: (codes: string) => void;
  /**
   * Entering animation using reanimated layout
   */
  enteringAnimated?: typeof LinearTransition;
  /**
   * Exiting animation using reanimated layout
   */
  exitingAnimated?: typeof LinearTransition;
}

export interface IOtpContext extends IOtpInput {
  inputRef: RefObject<TextInput[]>;
  otpValue: string[];
  onPress: () => void;
  onFocusNext: (value: string, index: number) => void;
  onFocusPrevious: (key: string, index: number) => void;
  setFocus: React.Dispatch<React.SetStateAction<number>>;
  setOtpValue: React.Dispatch<React.SetStateAction<string[]>>;
  focus: number;
  autoFocus: boolean;
  currentIndex: number;
  rest?: TextInputProps;
}

const OtpContext = createContext<IOtpContext>({} as IOtpContext);
const AnimatedStack = Animated.createAnimatedComponent(Stack);

const OtpItem = ({ i }: { i: number }) => {
  const {
    inputRef,
    onPress,
    otpValue,
    onFocusNext,
    onFocusPrevious,
    setFocus,
    setOtpValue,
    focus,
    autoFocus,
    containerStyle,
    inputStyle,
    textStyle,
    otpCount,
    editable,
    enteringAnimated,
    exitingAnimated,
    rest,
    focusColor,
  } = useContext(OtpContext);

  const border = useSharedValue(focus === i ? 1.5 : 0);

  const borderStyle = useAnimatedStyle(() => {
    return {
      borderWidth: border.value,
    };
  }, []);

  useEffect(() => {
    border.value = withDelay(
      50,
      withTiming(focus === i ? 1.5 : 0, { duration: 100 })
    );
  }, [focus]);

  useEffect(() => {
    if (otpValue) {
      if ((otpValue[i]?.length ?? 0) > 1) {
        const format = otpValue[i]?.substring(0, otpCount);
        const numbers = format?.split("") ?? [];
        setOtpValue(numbers);
        setFocus(-1);
        Keyboard.dismiss();
      }
    }
  }, [otpValue]);

  return (
    <View key={i} style={containerStyle}>
      <TextInput
        ref={inputRef?.current?.[i] as unknown as Ref<TextInput>}
        style={[styles.inputSize, inputStyle]}
        caretHidden
        keyboardType="number-pad"
        value={otpValue[i]}
        onChangeText={(v) => onFocusNext(v, i)}
        onKeyPress={(e) => onFocusPrevious(e.nativeEvent.key, i)}
        textContentType="oneTimeCode"
        autoFocus={autoFocus && i === 0}
        {...rest}
      />
      <Pressable disabled={!editable} onPress={onPress} style={styles.overlay}>
        <AnimatedStack
          borderColor={
            focus === i ? "$otp_border_active" : "$otp_border_inactive"
          }
          bg={focus === i ? "$otp_bg_active" : "$otp_bg_inactive"}
          style={[styles.inputSize, styles.input, inputStyle, borderStyle]}
        >
          {otpValue[i] !== "" && (
            <Animated.Text
              entering={enteringAnimated}
              exiting={exitingAnimated}
              style={[styles.text, textStyle]}
            >
              {otpValue[i]}
            </Animated.Text>
          )}
          {focus === i && <VerticalStick focusColor={focusColor} />}
        </AnimatedStack>
      </Pressable>
    </View>
  );
};

export const OtpField = ({
  disabled,
  otpCount = 6,
  containerStyle = {},
  inputStyle = {},
  textStyle = {},
  autoFocus = false,
  editable = true,
  enteringAnimated = FadeInDown,
  exitingAnimated = FadeOut,
  onCodeFilled,
  onCodeChanged,
  ...rest
}: IOtpInput) => {
  const data: string[] = new Array(otpCount).fill("");
  const inputRef = useRef(
    data.map((_) => {
      return createRef<TextInput>();
    })
  );
  const [focus, setFocus] = useState<number>(0);
  const [otpValue, setOtpValue] = useState<string[]>(data);

  const onPress = () => {
    if (focus === -1) {
      setFocus(otpCount - 1);
      otpValue[data.length - 1] = "";
      setOtpValue([...otpValue]);
      inputRef.current[data.length - 1]?.current?.focus();
    } else {
      inputRef.current[focus]?.current?.focus();
    }
  };

  const onFocusNext = (value: string, index: number) => {
    if (index < data.length - 1 && value) {
      inputRef.current[index + 1]?.current?.focus();
      setFocus(index + 1);
    }
    if (index === data.length - 1) {
      setFocus(-1);
      inputRef.current[index]?.current?.blur();
    }
    otpValue[index] = value;
    setOtpValue([...otpValue]);
  };

  const onFocusPrevious = (key: string, index: number) => {
    if (key === "Backspace" && index !== 0) {
      inputRef.current[index - 1]?.current?.focus();
      setFocus(index - 1);
      otpValue[index - 1] = "";
      setOtpValue([...otpValue]);
    } else if (key === "Backspace" && index === 0) {
      otpValue[0] = "";
    }
  };
  if (otpCount < 4 && otpCount > 6) {
    throw "OTP Count min is 4 and max is 6";
  }
  const inputProps = {
    inputRef,
    otpValue,
    onPress,
    onFocusNext,
    onFocusPrevious,
    setFocus,
    setOtpValue,
    focus,
    autoFocus,
    containerStyle,
    inputStyle,
    textStyle,
    otpCount,
    editable,
    enteringAnimated,
    exitingAnimated,
    rest,
  };

  useEffect(() => {
    onCodeChanged?.(otpValue.join(""));
    if (
      otpValue &&
      Number(otpValue.join("").length === otpCount) &&
      onCodeFilled
    ) {
      onCodeFilled(otpValue.join(""));
    }
  }, [otpValue]);

  return (
    <OtpContext.Provider value={inputProps as unknown as IOtpContext}>
      <XStack items="center" justify="center">
        {data.map((_, i) => {
          return <OtpItem key={i} i={i} />;
        })}
      </XStack>
    </OtpContext.Provider>
  );
};

const styles = StyleSheet.create({
  inputSize: {
    height: 60,
    width: 45,
    marginHorizontal: 8,
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowOpacity: 0.09,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    elevation: 3,
  },
  text: {
    fontWeight: "600",
    fontSize: 26,
    color: "black",
  },
  overlay: {
    position: "absolute",
  },
});
