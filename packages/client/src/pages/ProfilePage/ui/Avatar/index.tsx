import { ChangeEvent, FC, useRef, useState } from 'react';
import type { TAvatarProps } from './types';
import css from './styes.module.scss';
import { useTimedState } from '../SingleChangeFieldset/hooks/useTimedState';
import { UX_TIMED_BASE } from '../../../../shared/constants/ux';
import { getBase64 } from './helpers/getBase64';
import { BASE_URL } from './constants';
import { StateIcon } from './StateIcon';
import { ReactComponent as ImageIcon } from '../../../../shared/assets/icons/imgIcon.svg';

export const Avatar: FC<TAvatarProps> = ({ url, handler }) => {
  const [urlState, setUrlState] = useState(BASE_URL + url);
  const [isLoading, setLoading] = useState(false);
  const [success, setTimedSuccess] = useTimedState(UX_TIMED_BASE);
  const [changeError, setTimedChangeError] = useTimedState(UX_TIMED_BASE);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setLoading(true);
    const result = await handler(e.target.files[0]);

    if (result) {
      setTimedSuccess();
    } else {
      setTimedChangeError();
    }

    const urlBase64 = await getBase64(e.target.files[0]);
    setUrlState(urlBase64);

    setLoading(false);
  };

  const isNoActivity = !isLoading && !success && !changeError;
  const hoverClass = !isNoActivity ? css.hover : '';

  return (
    <div className={css.container}>
      <input
        className={css.input}
        ref={inputRef}
        type="file"
        onChange={handleFileUpload}
      />
      <button className={css.button} type="button" onClick={handleAvatarClick}>
        <img className={css.img} src={urlState} alt="аватар" />

        <div className={[css.overlay, hoverClass].join(' ')}>
          {isNoActivity && <ImageIcon className={css.icon} />}
          {!isNoActivity && (
            <StateIcon
              isLoading={isLoading}
              success={success}
              changeError={changeError}
              center
              white
            />
          )}
        </div>
      </button>
    </div>
  );
};
