import { findAll } from "highlight-words-core";
import find from "lodash-es/find";
import map from "lodash-es/map";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import type { TypographyProps } from "./typography";
import { Typography } from "./typography";

function defaultSanitize(string: string): string {
  return string;
}

type HighlightTextProps = TypographyProps & {
  searchWords: TypographyProps[];
  autoEscape?: boolean;
  caseSensitive?: boolean;
  sanitize?: typeof defaultSanitize;
};

export const HighlightText = memo(
  ({
    autoEscape,
    caseSensitive,
    sanitize,
    searchWords,
    text,
    tx,
    txOptions,
    ...rest
  }: HighlightTextProps) => {
    const { t } = useTranslation();
    const _textToHighlight =
      tx ?? text
        ? String(
            tx
              ? String(t(tx as string, txOptions as Record<string, unknown>))
              : text
          )
        : "";
    const _searchWords = map(searchWords, (item: TypographyProps) =>
      String(
        item.tx
          ? t(item.tx as string, item.txOptions as Record<string, unknown>)
          : item.text
      )
    ) as string[];
    const chunks = findAll({
      autoEscape,
      caseSensitive,
      sanitize,
      searchWords: _searchWords,
      textToHighlight: _textToHighlight,
    });

    return (
      <Typography {...rest}>
        {chunks.map(
          (
            chunk: { start: number; end: number; highlight: boolean },
            index: number
          ) => {
            const _text = _textToHighlight.substring(chunk.start, chunk.end);

            const _highlightProps = find(searchWords, (item) => {
              const search = String(
                item.tx ? t(item.tx as string, item.txOptions) : item.text
              );
              return _text === search;
            });

            return chunk.highlight ? (
              <Typography
                {...rest}
                {..._highlightProps}
                key={`chunk-${index}`}
              />
            ) : (
              _text
            );
          }
        )}
      </Typography>
    );
  }
);

HighlightText.displayName = "HighlightText";
