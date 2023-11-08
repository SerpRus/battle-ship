import { ButtonHTMLAttributes } from 'react';

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  secondary?: boolean;
  ternary?: boolean;
  submit?: boolean;
};
