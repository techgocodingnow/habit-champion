import { s } from "@gocodingnow/rn-size-matters";
import { memo, useMemo, useState } from "react";
import {
  type GetThemeValueForKey,
  Image,
  Stack,
  type StackProps,
} from "tamagui";

import { getInitials } from "@/src/utils/text";
import { Typography } from "./typography";

type AvatarProps = {
  variant?: "small" | "medium" | "large";
  name?: string | null | undefined;
  imageUrl?: string | null | undefined;
  size?: number | GetThemeValueForKey<"height"> | null | undefined;
  avatarProps?: StackProps & { size?: number };
  fallbackProps?: StackProps;
  fallbackTextProps?: React.ComponentProps<typeof Typography>;
};

export const Avatar = memo(
  ({
    variant,
    name,
    imageUrl,
    avatarProps,
    fallbackProps,
    fallbackTextProps,
    size,
  }: AvatarProps) => {
    const [isError, setIsError] = useState(false);

    const _size = useMemo(() => {
      if (variant === "small") {
        return s(24);
      }
      if (variant === "medium") {
        return s(32);
      }
      if (variant === "large") {
        return s(48);
      }
      return size;
    }, [variant, size]);

    return (
      <Stack
        bg="#5E8BFF"
        {...avatarProps}
        height={_size}
        width={_size}
        rounded={1000}
        overflow="hidden"
      >
        <Image
          alt={getInitials(name)}
          accessibilityLabel={getInitials(name)}
          src={imageUrl ?? undefined}
          onError={() => setIsError(true)}
          width="100%"
          height="100%"
        />
        {isError && (
          <Stack
            justify="center"
            items="center"
            position="absolute"
            height={_size}
            width={_size}
            {...fallbackProps}
          >
            <Typography
              color="white"
              value={getInitials(name)}
              variant={
                variant === "small"
                  ? "h6R"
                  : variant === "medium"
                  ? "h5R"
                  : "h5R"
              }
              {...fallbackTextProps}
            />
          </Stack>
        )}
      </Stack>
    );
  }
);
Avatar.displayName = "Avatar";
