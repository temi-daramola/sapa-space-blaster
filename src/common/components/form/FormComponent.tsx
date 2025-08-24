import { Box } from "@chakra-ui/react";
import { Formik, } from "formik";
import React from "react";

// Define the type for props
type ControlledFormProps = {
  children: ((formik: any) => React.ReactNode) | React.ReactNode; // Union type for children
  initialValues: any; // Define a more specific type for initialValues if you know the shape
  schema: any; // Your validation schema type, e.g., Yup.ObjectSchema
  handleSubmit?: (values: any) => void; // Optional submit handler
  resetRef?: React.RefObject<HTMLButtonElement>; // Ref for the hidden reset button
  useFormik?: boolean; // Whether to pass formik to children
  [x: string]: any; // Allow other props (e.g., Box props)
};
export const ControlledForm = ({
  children,
  initialValues,
  schema,
  handleSubmit,
  resetRef,
  useFormik,
  ...props
}: ControlledFormProps) => {
  return (
    <Box {...props}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={schema}
        resetRef={resetRef}
        onSubmit={(values) => {
          if (handleSubmit) handleSubmit(values);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {useFormik ? (
              // <React.Fragment>{children(formik)}</React.Fragment>
              // When useFormik is true, children must be a function, so call it with formik
              <React.Fragment>{(children as (formik: any) => React.ReactNode)(formik)}</React.Fragment>
            ) : (
             // When useFormik is false, render children directly as ReactNode
             <React.Fragment>{typeof children === "function" ? null : children}</React.Fragment>
            //  <React.Fragment>{children as React.ReactNode}</React.Fragment> // <-- Cast children to ReactNode
            )}
            <button
              type="button"
              hidden
              ref={resetRef}
              onClick={() => formik.resetForm()} 
            ></button>
          </form>
        )}
      </Formik>
    </Box>
  );
};
