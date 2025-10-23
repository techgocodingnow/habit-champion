import { Stack } from "tamagui";
import { Typography } from "./ui/typography";
import { ButtonPrimary } from "./ui/button";

export const HabitChallengeCard = () => {
  return (
    <Stack
      bg="$card_bg"
      rounded="$card"
      px="$card_horizontal"
      py="$card_vertical"
      mb="$gap_vertical"
      mx="$container"
    >
      <Typography value="Habit Challenge" />
      <ButtonPrimary tx="accept" self="flex-start" />
    </Stack>
  );
};
