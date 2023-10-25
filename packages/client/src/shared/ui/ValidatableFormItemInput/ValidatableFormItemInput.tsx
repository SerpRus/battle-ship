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

interface ValidatableFormItemInputProps<T> {
  name: string;
  label?: string;
  control: Control<any>;
  errors: Partial<FieldErrorsImpl<DeepRequired<FieldValues>>>;
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
