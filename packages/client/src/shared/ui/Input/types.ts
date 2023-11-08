import type { InputHTMLAttributes, Ref } from 'react';

export type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  error?: string;
};
