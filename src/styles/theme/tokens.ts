import { s, vs } from "@gocodingnow/rn-size-matters";
import { createTokens } from "tamagui";

const size = {
  button: 44,
  segmented_control: 34,
  avatar_small: 24,
  avatar_medium: 32,
  avatar_large: 48,
};

const space = {
  container: s(16),
  gap_vertical: vs(16),
  gap_horizontal: s(16),
  gap_list_item: s(16),

  input: s(8),

  list_item_vertical: vs(16),
  list_item_horizontal: s(16),

  card_vertical: vs(16),
  card_horizontal: s(16),

  padding_vertical: vs(24),
};

const radius = {
  button: 100,
  input: s(4),
  popup: s(8),
  card: s(8),
};

const tokens = createTokens({
  size,
  space,
  radius,
  zIndex: {},
  color: {},
});

export default tokens;
