import type { FC } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import type { TStateIconProps } from './types';
import css from './styes.module.scss';

export const StateIcon: FC<TStateIconProps> = ({
  isLoading,
  success,
  changeError,
  center = false,
  white = false,
}) => {
  if (!isLoading && !success && !changeError) {
    return null;
  }

  const centerClass = center ? css.center : '';
  const whiteClass = white ? css.white : '';
  return (
    <div className={[css.container, centerClass, whiteClass].join(' ')}>
      {isLoading && <Spin className={css.spinner} />}
      {success && <CheckOutlined className={css.check} />}
      {changeError && <CloseOutlined className={css.cross} />}
    </div>
  );
};
