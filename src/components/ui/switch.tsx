import { type SwitchProps, Switch as TSwitch } from "tamagui";

export const Switch = (props: SwitchProps) => {
  return (
    <TSwitch
      size="$4"
      bg={props.checked ? "$primary" : "$switch_bg_inactive"}
      borderColor={props.checked ? "$primary" : "$switch_bg_inactive"}
      {...props}
    >
      <TSwitch.Thumb
        animation="quicker"
        borderColor={props.checked ? "white" : "$switch_thumb_inactive"}
      />
    </TSwitch>
  );
};
