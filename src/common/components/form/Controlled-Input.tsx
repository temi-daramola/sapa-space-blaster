import { useEffect } from "react";
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

// Define the type for props
type Props = {
  label: string;
  onChange?: (value: any) => void;
  baseProps?: any;
  [x: string]: any; // to allow additional props
};

export const ControlledInput = ({
  label,
  onChange,
  baseProps,
  ...rest
}: Props) => {
  // Use Formik's useField hook to bind the field
  const [field, meta] = useField(rest);

  useEffect(() => {
    const value = meta.value;
    if (onChange) onChange(value);
  }, [meta.value, onChange]); // Add onChange to dependencies

  return (
    <FormControl isInvalid={meta.error && meta.touched} {...baseProps}>
      <FormLabel>{label}</FormLabel>
      <Field as={Input} {...field} {...rest} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
