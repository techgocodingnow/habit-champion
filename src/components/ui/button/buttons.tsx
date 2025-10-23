import { s } from "@gocodingnow/rn-size-matters";

import { ButtonBase, type ButtonBaseProps } from "./button.base";

type ButtonPrimaryProps = ButtonBaseProps;
type ButtonSecondaryProps = ButtonBaseProps;
type ButtonClearProps = ButtonBaseProps;

export const ButtonPrimary = ({
  children,
  disabled,
  ...rest
}: ButtonPrimaryProps) => {
  return (
    <ButtonBase
      disabledStyle={{
        bg: "$button_bg_primary_disabled",
        borderColor: "$button_border_primary_disabled",
      }}
      bg="$button_bg_primary_default"
      borderColor="$button_border_primary_default"
      color={
        disabled
          ? "$button_text_primary_disabled"
          : "$button_text_primary_default"
      }
      disabled={disabled}
      {...rest}
    />
  );
};

export const ButtonSecondary = ({
  children,
  disabled,
  ...rest
}: ButtonSecondaryProps) => {
  return (
    <ButtonBase
      borderWidth={1.5}
      disabled={disabled}
      bg="$button_bg_secondary_default"
      borderColor="$button_border_secondary_default"
      disabledStyle={{
        bg: "$button_bg_secondary_disabled",
        borderColor: "$button_border_secondary_disabled",
      }}
      color={
        disabled
          ? "$button_text_secondary_disabled"
          : "$button_text_secondary_default"
      }
      {...rest}
    />
  );
};

export const ButtonClear = ({
  children,
  disabled,
  textProps,
  ...rest
}: ButtonClearProps) => {
  return (
    <ButtonBase
      disabled={disabled}
      bg="transparent"
      color={
        disabled ? "$button_text_clear_disabled" : "$button_text_clear_default"
      }
      textProps={{
        fontFamilyVariant: "secondary",
        textTransform: "capitalize",
        variant: "h4R",
        ...textProps,
      }}
      px={s(4)}
      {...rest}
    />
  );
};
