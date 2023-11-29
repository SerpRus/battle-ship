import type { InputHTMLAttributes, PropsWithChildren } from 'react';

export type TFormInputProps = InputHTMLAttributes<HTMLInputElement> &
  PropsWithChildren & {
    name: string;
    label: string;
    error?: string;
  };
