import { Switch, type SwitchProps } from "tamagui";

export type SwitchFieldProps = SwitchProps;
export const SwitchField = ({ value, ...rest }: SwitchFieldProps) => {
  return (
    <Switch native="mobile" {...rest}>
      <Switch.Thumb animation={"quicker" as any} />
    </Switch>
  );
};
