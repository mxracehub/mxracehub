
import { withTheme } from "@rjsf/core";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { useCallback } from "react";

const Form = withTheme({});

interface SchemaFormProps {
  schema: RJSFSchema;
  uiSchema?: UiSchema;
  formData?: any;
  onChange?: (data: any) => void;
  onSubmit?: (data: any) => void;
  onError?: (errors: any) => void;
}

export function SchemaForm({ 
  schema, 
  uiSchema,
  formData,
  onChange,
  onSubmit,
  onError 
}: SchemaFormProps) {
  const handleSubmit = useCallback(({ formData }) => {
    onSubmit?.(formData);
  }, [onSubmit]);

  const handleError = useCallback((errors) => {
    onError?.(errors);
  }, [onError]);

  const handleChange = useCallback(({ formData }) => {
    onChange?.(formData);
  }, [onChange]);

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onError={handleError}
    />
  );
}
