import { Stack, type StackProps } from "tamagui";

type DividerProps = StackProps;
export const Divider = (props: DividerProps) => {
  return <Stack height={0.5} bg="$divider" {...props} />;
};
