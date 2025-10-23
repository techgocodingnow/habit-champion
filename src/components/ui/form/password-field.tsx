import { forwardRef, useState } from "react";
import type { TextInput } from "react-native";

import { TextField, type TextFieldProps } from "./text-field";
import { IconButton } from "../icon-button";

export const PasswordField = forwardRef<TextInput, TextFieldProps>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);
    return (
      <TextField
        ref={ref}
        autoCapitalize="none"
        autoComplete="password"
        type={visible ? "text" : "password"}
        autoCorrect={true}
        spellCheck={true}
        suffix={
          <IconButton
            onPress={() => setVisible(!visible)}
            name={visible ? "eye-on" : "eye-off"}
            color="$input_text_default"
          />
        }
        {...props}
      />
    );
  }
);

PasswordField.displayName = "PasswordField";
