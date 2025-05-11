import { useEffect } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { getDefaultRegistry } from "@rjsf/core";
import { RJSFSchema, UiSchema } from "@rjsf/utils";

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
  const { fields } = getDefaultRegistry();

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      formData={formData}
      fields={fields}
      onChange={e => onChange?.(e)}
      onSubmit={e => onSubmit?.(e.formData)}
      onError={e => onError?.(e)}
      className="space-y-4"
    />
  );
}