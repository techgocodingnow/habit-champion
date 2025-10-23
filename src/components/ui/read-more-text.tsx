import { useState } from "react";
import { Platform, Text, type TextLayoutLine } from "react-native";

import { Typography, type TypographyProps } from "./typography";

export type IReadMoreTextProps = TypographyProps & {
  numberOfLines?: number;
  paragraph?: string;
  children?: string;
  readMoreText?: string;
  readMoreTx?: string;
  readLessText?: string;
  readLessTx?: string;
  readMoreProps?: TypographyProps;
  readLessProps?: TypographyProps;
};

interface TextProperties {
  length: number;
  isTruncatedText: boolean;
}

export const ReadMoreText = ({
  numberOfLines = 1,
  children,
  paragraph,
  readMoreText,
  readMoreTx = "read_more",
  readLessText,
  readLessTx = "read_less",
  readMoreProps,
  readLessProps,
  ...props
}: IReadMoreTextProps) => {
  const [readMore, setReadMore] = useState<boolean>(false);
  const [text, setText] = useState<TextProperties>({
    length: 0,
    isTruncatedText: false,
  });
  const content: string = (paragraph ? paragraph : children) ?? "";

  const getReadMoreStyle = () => {
    if (readMore) {
      return readLessProps;
    }
    return readMoreProps;
  };

  function handleReadMoreText(textLayoutLines: TextLayoutLine[]) {
    let textLength = 0;
    if (textLayoutLines.length > numberOfLines) {
      for (let line = 0; line < numberOfLines; line++) {
        textLength += textLayoutLines[line].text.length;
      }
      setText({ length: textLength, isTruncatedText: true });
      return;
    }
    setText({ length: content.length, isTruncatedText: false });
  }

  return (
    <>
      {/** 
      iOS always requires one element without a line number 
      to determine the number of lines.
     */}
      {Platform.OS === "ios" && (
        <Typography
          style={{ height: 0 }}
          onTextLayout={({ nativeEvent: { lines } }: any) => {
            if (text.length > 0) {
              return;
            }
            handleReadMoreText(lines);
          }}
        >
          {content}
        </Typography>
      )}
      <Typography
        numberOfLines={text.length === 0 ? numberOfLines : 0}
        onTextLayout={({ nativeEvent: { lines } }: any) => {
          if (text.length > 0) {
            return;
          }
          if (Platform.OS === "android") {
            handleReadMoreText(lines);
          }
        }}
        {...props}
      >
        {text.isTruncatedText && !readMore && text.length !== 0
          ? `${content.slice(0, text.length - 10).trim()}...`
          : content}
        {text.isTruncatedText && (
          <>
            <Text> </Text>
            <Typography
              {...getReadMoreStyle()}
              variant="h6R"
              color="$text_primary"
              onPress={() => setReadMore(!readMore)}
              tx={readMore ? readLessTx : readMoreTx}
              text={readMore ? readLessText : readMoreText}
            />
          </>
        )}
      </Typography>
    </>
  );
};
