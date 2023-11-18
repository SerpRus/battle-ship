import React, { FC } from 'react';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import BattleShip from '../../../components/BattleShip';
import { Button } from '../../../shared/ui/Button';

import cls from './gamePage.module.scss';
import { AppDispath, RootState } from '../../../store';
import { fullScreen, helpersActions } from '../../../store/helpersSlice';

const { Content } = Layout;

export const GamePage: FC = () => {
  const dispatch = useDispatch<AppDispath>();
  const isFullScreen = useSelector((s: RootState) => s.helpers.isFullScreen);

  const onFullScreen = () => {
    dispatch(helpersActions.toogleFullScreen());
    dispatch(fullScreen());
  };

  return (
    <Layout className={cls.wrapper}>
      <Content className={cls.content}>
        <BattleShip />
        <Button onClick={onFullScreen} type="button">
          {isFullScreen ? 'Отключить полный экран' : 'Включить полный экран'}
        </Button>
      </Content>
    </Layout>
  );
};
