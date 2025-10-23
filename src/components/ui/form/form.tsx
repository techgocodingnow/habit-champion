import { vs } from "@gocodingnow/rn-size-matters";
import { Stack, XStack } from "tamagui";
import type { XStackProps } from "tamagui";
import type { ComponentPropsWithoutRef } from "react";
import { createContext, useContext, useId } from "react";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { Typography } from "../typography";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = ({ ...props }: ComponentPropsWithoutRef<typeof Stack>) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <Stack gap={vs(4)} {...props} />
    </FormItemContext.Provider>
  );
};
FormItem.displayName = "FormItem";

const FormLabel = ({
  required,
  containerProps,
  ...props
}: ComponentPropsWithoutRef<typeof Typography> & {
  required?: boolean;
  containerProps?: XStackProps;
}) => {
  const { formItemId } = useFormField();

  return (
    <XStack {...containerProps}>
      <Typography id={formItemId} variant="labelM" {...props} />
      {required && (
        <Typography color="$input_label_required" variant="h5M">
          *
        </Typography>
      )}
    </XStack>
  );
};
FormLabel.displayName = "FormLabel";

const FormControl = ({ ...props }: ComponentPropsWithoutRef<typeof Stack>) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Stack
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
};
FormControl.displayName = "FormControl";

const FormDescription = ({
  ...props
}: ComponentPropsWithoutRef<typeof Typography>) => {
  const { formDescriptionId } = useFormField();

  return (
    <Typography
      color="$description_text"
      variant="h5R"
      id={formDescriptionId}
      {...props}
    />
  );
};
FormDescription.displayName = "FormDescription";

const FormMessage = ({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Typography>) => {
  const { error, formMessageId } = useFormField();
  const body = error?.message ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <Typography
      id={formMessageId}
      color="$input_message_error"
      variant="h5R"
      {...props}
    >
      {body}
    </Typography>
  );
};
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
