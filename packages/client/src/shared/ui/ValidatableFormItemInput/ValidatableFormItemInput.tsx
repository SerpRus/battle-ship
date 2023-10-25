import { Form, Input } from 'antd';
import {
  Control,
  Controller,
  DeepRequired,
  FieldErrorsImpl,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import React from 'react';

interface ValidatableFormItemInputProps {
  name: string;
  label?: string;
  // TODO: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errors: Partial<FieldErrorsImpl<DeepRequired<FieldValues>>>;
  // TODO: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules: RegisterOptions<FieldValues, any>;
  isPassword?: boolean;
  required?: boolean;
}

export const ValidatableFormItemInput = <T,>(
  props: ValidatableFormItemInputProps<T>
) => {
  const {
    name,
    control,
    errors,
    rules,
    label,
    isPassword = false,
    required = true,
  } = props;
  return (
    <Controller
      name={name}
      control={control as Control}
      rules={rules}
      render={field => (
        <Form.Item
          label={required ? `${label} *` : label}
          name={name}
          validateStatus={errors?.[name]?.message ? 'error' : undefined}
          help={(errors?.[name]?.message as string) ?? ''}
          {...field}>
          <Controller
            name={name}
            control={control as Control}
            render={({ field }) => {
              if (isPassword) {
                return <Input.Password {...field} />;
              }
              return <Input {...field} />;
            }}
          />
        </Form.Item>
      )}
    />
  );
};
