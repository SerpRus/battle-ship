import React, { FC } from 'react';
import { Layout } from 'antd';
import BattleShip from '../../../entities/BattleShip';
import { Button } from '../../../shared/ui/Button';

import cls from './gamePage.module.scss';
import { useAuth } from '../../../app/providers/AuthProvider/AuthProvider';

const { Content } = Layout;

export const GamePage: FC = () => {
  const { isFullScreen, fullScreen } = useAuth();

  return (
    <Layout className={cls.wrapper}>
      <Content className={cls.content}>
        <BattleShip />
        <Button onClick={fullScreen} type="button">
          {isFullScreen ? 'Отключить полный экран' : 'Включить полный экран'}
        </Button>
      </Content>
    </Layout>
  );
};
