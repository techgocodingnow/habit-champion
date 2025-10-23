import { MotiView } from "moti";
import { useEffect, useState } from "react";
import { Stack, XStack } from "tamagui";

import { Typography, type TypographyProps } from "./typography";

const numbersToNice = [...Array(10).keys()];
const _stagger = 50;

function Tick(props: TypographyProps) {
  return <Typography {...props} />;
}

type TickerListProps = {
  index: number;
  number: number;
  fontSize: number;
  delay?: number;
  textProps?: TypographyProps;
};
function TickerList({
  number,
  fontSize,
  index,
  delay = 0,
  textProps,
}: TickerListProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);
      return () => clearTimeout(timer);
    }
    setShouldAnimate(true);
  }, [delay]);

  return (
    <Stack height={fontSize} overflow="hidden">
      <MotiView
        animate={{
          translateY: shouldAnimate ? -number * fontSize * 1.1 : 0,
        }}
        transition={{
          delay: shouldAnimate ? index * _stagger : 0,
          damping: 80,
          stiffness: 200,
        }}
      >
        {numbersToNice.map((num, index) => {
          return (
            <Tick
              key={index.toString()}
              text={num}
              {...textProps}
              fontSize={fontSize}
              lineHeight={fontSize * 1.1}
              fontVariant={["tabular-nums"]}
            />
          );
        })}
      </MotiView>
    </Stack>
  );
}

export const AnimatedNumber = ({
  value,
  fontSize = 24,
  delay = 0,
  textProps,
}: {
  value: number;
  fontSize?: number;
  delay?: number;
  textProps?: TypographyProps;
}) => {
  const intNumber = new Intl.NumberFormat("en-US").format(value);
  const slittedValue = intNumber.split("");
  const [newFontSize, setNewFontSize] = useState(fontSize);

  return (
    <Stack>
      <Tick
        {...textProps}
        fontSize={fontSize}
        numberOfLines={1}
        adjustsFontSizeToFit
        onTextLayout={(e: any) => {
          setNewFontSize(e.nativeEvent.lines[0].ascender);
        }}
        position="absolute"
        z={-1}
      />
      <XStack flexWrap="wrap">
        {slittedValue.map((item, index) => {
          if (!Number.isNaN(Number(item))) {
            return (
              <TickerList
                key={index}
                index={index}
                number={Number(item)}
                fontSize={newFontSize}
                delay={delay}
                textProps={textProps}
              />
            );
          }
          return (
            <Tick
              key={index}
              text={item}
              {...textProps}
              fontSize={fontSize}
              lineHeight={fontSize * 1.1}
              fontVariant={["tabular-nums"]}
            />
          );
        })}
      </XStack>
    </Stack>
  );
};
