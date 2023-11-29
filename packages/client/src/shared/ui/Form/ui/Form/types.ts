import type { FormHTMLAttributes } from 'react';

export type TFormProps = FormHTMLAttributes<HTMLFormElement> & {
  onSubmit: () => void;
};
