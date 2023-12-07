import React, { useContext } from 'react';
import type { FC } from 'react';
import type { TButtonProps } from './types';
import css from './styes.module.scss';

import { ThemeContext } from '../Theme';

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
  const currentTheme = useContext(ThemeContext);
  const themebtn = currentTheme?.type === 'dark' ? css.dark : null;

  return (
    <button
      className={[
        css.button,
        secondaryClass,
        ternaryClass,
        className,
        themebtn,
      ].join(' ')}
      type="button"
      {...props}>
      {children}
    </button>
  );
};
