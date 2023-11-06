import React, { FC, useState } from 'react';
import { Layout } from 'antd';
import BattleShip from '../../../components/BattleShip';
import { Button } from '../../../shared/ui/Button';

import cls from './gamePage.module.scss';

const { Content } = Layout;

export const GamePage: FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onFullScreen = async () => {
    const header = document.querySelector('.navbar') as HTMLElement | null;

    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullScreen(false);
        // TODO: передавать в стейт значение для отображения видимости шапки
        if (header) {
          header.style.display = 'none';
        }
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullScreen(true);
        if (header) {
          header.style.display = 'block';
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`Ошибка включения полноэкранного режима`); // eslint-disable-line
      }
    }
  };

  return (
    <Layout className={cls.wrapper}>
      <Content className={cls.content}>
        <BattleShip />
        <Button onClick={onFullScreen} type="button">
          {isFullScreen ? 'Включить полный экран' : 'Отключить полный экран'}
        </Button>
      </Content>
    </Layout>
  );
};
