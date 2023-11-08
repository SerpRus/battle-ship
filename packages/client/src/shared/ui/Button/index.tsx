import type { FC } from 'react';
import type { TButtonProps } from './types';
import css from './styes.module.scss';

export const Button: FC<TButtonProps> = ({
  children,
  secondary = false,
  ternary = false,
  className,
  ...props
}) => {
  let prioritisedTernary = ternary;
  if (secondary && ternary) {
    prioritisedTernary = false;
  }

  const ternaryClass = prioritisedTernary ? css.ternary : '';
  const secondaryClass = secondary ? css.secondary : '';
  return (
    <button
      className={[css.button, secondaryClass, ternaryClass, className].join(
        ' '
      )}
      type="button"
      {...props}>
      {children}
    </button>
  );
};
