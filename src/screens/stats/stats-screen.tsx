import { Screen } from "@/src/components/ui/screen";
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
  RadarChart,
} from "react-native-gifted-charts";
const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];

const StatsScreen = () => {
  return (
    <Screen variant="scroll" safeAreaTop safeAreaBottom>
      <Screen.Container>
        <Screen.Body>
          <BarChart data={data} />
          <LineChart data={data} />
          <PieChart data={data} />
          <PopulationPyramid
            data={[
              { left: 10, right: 12 },
              { left: 9, right: 8 },
            ]}
          />
          <RadarChart data={[50, 80, 90, 70]} />

          <BarChart data={data} horizontal />

          <LineChart data={data} areaChart />

          <PieChart data={data} donut />
        </Screen.Body>
      </Screen.Container>
    </Screen>
  );
};

export default StatsScreen;
