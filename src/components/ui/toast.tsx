import { s, vs } from "@gocodingnow/rn-size-matters";
import { useMemo } from "react";
import { GetThemeValueForKey, Stack, XStack } from "tamagui";

import { ToastShowParams } from "toastify-react-native/utils/interfaces";
import { Icon, IconName } from "./icon";
import { Typography } from "./typography";

interface ToastWarningProps {
  state: ToastShowParams;
  type: "success" | "error" | "warning";
}

export const Toast = ({ state, type }: ToastWarningProps) => {
  const icon = useMemo(() => {
    if (type === "success") {
      return "toast-success";
    }
    if (type === "warning") {
      return "toast-warning";
    }
    return "toast-error";
  }, [type]);

  const bgColor = useMemo(() => {
    if (type === "success") {
      return "$toast_bg_success";
    }
    if (type === "warning") {
      return "$toast_bg_warning";
    }
    return "$toast_bg_error";
  }, [type]);

  return (
    <Stack width="100%" items="center" px={s(16)}>
      <XStack
        items="center"
        px={s(16)}
        py={vs(8)}
        gap={s(10)}
        bg={bgColor as GetThemeValueForKey<"backgroundColor">}
        rounded={s(8)}
      >
        <Icon name={icon as IconName} size={24} color="white" />
        <Stack flex={1} justify="center">
          {!!state.text1 && (
            <Typography
              value={state.text1}
              numberOfLines={2}
              color="white"
              variant="h5R"
            />
          )}
          {!!state.text2 && (
            <Typography
              value={state.text2}
              numberOfLines={4}
              color="white"
              variant="h5R"
            />
          )}
        </Stack>
      </XStack>
    </Stack>
  );
};

export const toastConfig = {
  success: (state: ToastShowParams) => <Toast type="success" state={state} />,
  error: (state: ToastShowParams) => <Toast type="error" state={state} />,
  warning: (state: ToastShowParams) => <Toast type="warning" state={state} />,
};
