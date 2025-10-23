import { Screen } from "@/src/components/ui/screen";
import { Typography } from "@/src/components/ui/typography";
import {
  buildCalendar,
  Calendar,
  CalendarDayMetadata,
  CalendarItemDayWithContainerProps,
  toDateId,
  useCalendar,
  useOptimizedDayMetadata,
} from "@marceloterreiro/flash-calendar";
import uniqBy from "lodash-es/uniqBy";
import { DateTime } from "luxon";
import { useMemo, useRef } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import { Stack } from "tamagui";

const formatWeekDay = (date: Date, locale: string) =>
  DateTime.fromJSDate(date).toFormat("EEE", { locale });

const TodayScreen = () => {
  const { weekDaysList } = useCalendar({
    calendarMonthId: toDateId(DateTime.now().toJSDate()),
    calendarFirstDayOfWeek: "monday",
    getCalendarWeekDayFormat: formatWeekDay,
  });

  const monthsList = useMemo(() => {
    const temp = [];
    const currentMonth = DateTime.now().month;
    for (let i = currentMonth; i <= 12; i++) {
      const calendarMonthId = toDateId(
        DateTime.now().plus({ months: i }).toJSDate()
      );
      temp.push(calendarMonthId);
    }
    return temp;
  }, []);

  const weeksListData = useMemo(() => {
    const data = monthsList.reduce((acc, calendarMonthId) => {
      const { weeksList } = buildCalendar({
        calendarMonthId,
        calendarFirstDayOfWeek: "monday",
      });
      acc.push(...weeksList.flatMap((week) => week.map((day) => day)));
      return acc;
    }, [] as CalendarDayMetadata[]);
    return uniqBy(data, "id");
  }, [monthsList]);

  const { width } = useWindowDimensions();
  const dayWidth = width / 7;

  return (
    <Screen>
      <Screen.Header titleTx="today_header_title" />
      <Screen.Body>
        <Calendar.Row.Week>
          {weekDaysList.map((weekDay, i) => (
            <Calendar.Item.WeekName height={32} key={i}>
              {weekDay}
            </Calendar.Item.WeekName>
          ))}
        </Calendar.Row.Week>
        <FlatList
          horizontal
          pagingEnabled
          data={weeksListData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Stack width={dayWidth}>
              <Typography text="center">{item.displayLabel}</Typography>
            </Stack>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </Screen.Body>
    </Screen>
  );
};

export const useRenderCount = (id?: string) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const lastItemId = useRef(id);

  /**
   * See more at: https://shopify.github.io/flash-list/docs/recycling
   */
  if (lastItemId.current !== id) {
    lastItemId.current = id;
    renderCount.current = 1;
  }

  return renderCount.current;
};

export const PerfTestCalendarItemDayWithContainer = ({
  children,
  metadata: baseMetadata,
  onPress,
  theme,
  dayHeight,
  daySpacing,
  containerTheme,
}: CalendarItemDayWithContainerProps) => {
  const metadata = useOptimizedDayMetadata(baseMetadata);
  return (
    <Calendar.Item.Day.Container
      dayHeight={dayHeight}
      daySpacing={daySpacing}
      isStartOfWeek={metadata.isStartOfWeek}
      shouldShowActiveDayFiller={
        metadata.isRangeValid && !metadata.isEndOfWeek
          ? !metadata.isEndOfRange
          : false
      }
      theme={containerTheme}
    >
      <Calendar.Item.Day
        height={dayHeight}
        metadata={metadata}
        onPress={onPress}
        theme={theme}
      >
        {children}
        <Typography
          style={{
            fontSize: 8,
            fontStyle: "italic",
            textAlign: "center",
            color: metadata.state === "active" ? "white" : "black",
          }}
        />
      </Calendar.Item.Day>
    </Calendar.Item.Day.Container>
  );
};

export default TodayScreen;
