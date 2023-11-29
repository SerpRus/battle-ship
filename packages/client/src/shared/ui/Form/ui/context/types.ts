import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

export type TFormContext = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};
