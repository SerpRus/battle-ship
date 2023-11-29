import { FC } from 'react';
import css from './styes.module.scss';
import { TFormInputProps } from './types';
import { useFormContext } from '../hooks/useFormContext';

export const FormInput: FC<TFormInputProps> = ({
  className,
  name,
  label,
  placeholder = '',
  ...props
}) => {
  const { register, errors } = useFormContext();
  const error = errors[name]?.message as string;
  const hasErrorClass = error ? css.error : '';
  return (
    <fieldset className={[css.fieldset, hasErrorClass, className].join(' ')}>
      <input
        {...register(name)}
        placeholder={placeholder}
        className={css.input}
        name={name}
        {...props}
      />
      <label htmlFor={name} className={css.label}>
        {label}
      </label>
      {error && <span className={css.errorMessage}>{error}</span>}
    </fieldset>
  );
};
