import React, { useEffect } from "react";
import { FormLabel, FormErrorMessage, Box } from "@chakra-ui/react";

import { FormControl, Select } from "@chakra-ui/react";

import { Field, useField } from "formik";

export const ControlledSelect = ({ label, onChange, baseProps, ...props }) => {
  const [field, meta] = useField(props);
  useEffect(() => {
    const value = meta.value;
    if (onChange) onChange(value);
  }, [meta.value]);

  return (
    <FormControl isInvalid={meta.error && meta.touched} {...baseProps}>
      <FormLabel>{label}</FormLabel>
      <Box bg="white" color="black" as={Select} {...field} {...props} />
      <FormErrorMessage color="black">{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

// boxShadow="none" // Hide shadow on focus
// border="none"
// _focus={{
//   boxShadow: "none", // Hide shadow on focus
//   borderBottomColor: "transparent", // Hide border on focus
//   border: "none",
//   borderWidth: "none"
// }}
