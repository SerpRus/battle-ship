import type { FC, MouseEvent } from 'react';
import { ReactComponent as EyeClosedIcon } from '@shared/assets/icons/eyeClosed.svg';
import { ReactComponent as EyeOpenIcon } from '@shared/assets/icons/eyeOpen.svg';
import css from './styes.module.scss';
import { TInputProps } from '../Input/types';
import { Input } from '../Input';
import { useToggle } from '../../lib/hooks/useToggle';

export const Password: FC<Partial<TInputProps>> = ({
  label = 'Пароль',
  ...props
}) => {
  const [isShowing, toggleShowing] = useToggle(false);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    toggleShowing();
  };

  const type = isShowing ? 'text' : 'password';

  return (
    <Input label={label} type={type} {...props}>
      <button className={css.button} type="button" onClick={handleClick}>
        {!isShowing && <EyeClosedIcon className={css.icon} />}
        {isShowing && <EyeOpenIcon className={css.icon} />}
      </button>
    </Input>
  );
};
