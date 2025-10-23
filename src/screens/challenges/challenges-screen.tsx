import { HabitChallengeCard } from "@/src/components/habit-challenge-card";
import { Screen } from "@/src/components/ui/screen";
import { Typography } from "@/src/components/ui/typography";
import { FlashList } from "@shopify/flash-list";

const ChallengesScreen = () => {
  return (
    <Screen>
      <Screen.Header titleTx="challenges_header_title" />
      <FlashList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={({ item }) => <HabitChallengeCard />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 80,
          paddingTop: 16,
        }}
      />
    </Screen>
  );
};

export default ChallengesScreen;
