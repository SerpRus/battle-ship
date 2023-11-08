import type { FC, MouseEvent } from 'react';
import css from './styes.module.scss';
import type { TSaveButtonProps } from './types';

export const SaveButton: FC<TSaveButtonProps> = ({
  isDisabled = false,
  innerRef,
  ...props
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const disabledClass = isDisabled ? css.disabled : '';
  return (
    <button
      onClick={handleClick}
      ref={innerRef}
      className={[css.button, disabledClass].join(' ')}
      type="button"
      {...props}>
      <span className={css.text}>Сохранить</span>
    </button>
  );
};
