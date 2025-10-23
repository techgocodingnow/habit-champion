import type { CheckboxProps as TCheckboxProps } from "tamagui";
import { Checkbox as TCheckbox } from "tamagui";

import { Icon } from "./icon";

export const Checkbox = (props: TCheckboxProps) => {
  return (
    <TCheckbox
      {...props}
      borderColor="$checkbox_border"
      backgroundColor={
        props.checked ? "$checkbox_bg_active" : "$checkbox_bg_inactive"
      }
    >
      <TCheckbox.Indicator>
        <Icon name="check" />
      </TCheckbox.Indicator>
    </TCheckbox>
  );
};
