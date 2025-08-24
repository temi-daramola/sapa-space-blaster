import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useField } from "formik";

// Props type
type RadioOption = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  name: string;
  options: RadioOption[];
  direction?: "row" | "column";
  [x: string]: any;
};

export const ControlledRadioGroup = ({
  label,
  name,
  options,
  direction = "column",
  ...rest
}: Props) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl isInvalid={!!meta.error && meta.touched} {...rest}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        value={field.value}
        onChange={(val) => helpers.setValue(val)}
      >
        <Stack direction={direction}>
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
