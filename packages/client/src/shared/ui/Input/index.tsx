import { FC } from 'react';
import css from './styes.module.scss';
import { TInputProps } from './types';

export const Input: FC<TInputProps> = ({
  className,
  label,
  placeholder = '',
  children,
  name = css.input,
  error,
  ref = null,
  ...props
}) => {
  const hasErrorClass = error ? css.error : '';
  return (
    <fieldset className={[css.fieldset, hasErrorClass, className].join(' ')}>
      <input
        className={css.input}
        name={name}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
      <label htmlFor={name} className={css.label}>
        {label}
      </label>
      {children}
      {error && <span className={css.errorMessage}>{error}</span>}
    </fieldset>
  );
};
