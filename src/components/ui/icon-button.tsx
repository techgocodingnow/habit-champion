import { s } from "@gocodingnow/rn-size-matters";
import omit from "lodash-es/omit";
import { Stack, type StackProps } from "tamagui";

import { Icon, type IconProps } from "./icon";

type IconButtonProps = IconProps & StackProps;
export const IconButton = ({
  name,
  size,
  style,
  type,
  color,
  ...rest
}: IconButtonProps) => {
  return (
    <Stack {...omit(rest, "ref")} hitSlop={s(12)}>
      <Icon name={name} {...{ color, size, style, type }} />
    </Stack>
  );
};
