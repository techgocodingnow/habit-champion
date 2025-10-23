import { forwardRef } from "react";
import type { TextInput } from "react-native";

import { TextField, type TextFieldProps } from "./text-field";

export const EmailField = forwardRef<TextInput, TextFieldProps>(
  (props, ref) => {
    return (
      <TextField
        ref={ref}
        keyboardType="email-address"
        textContentType="emailAddress"
        type="text"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={true}
        spellCheck={true}
        {...props}
      />
    );
  }
);

EmailField.displayName = "EmailField";
