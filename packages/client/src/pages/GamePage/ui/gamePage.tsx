import React, { FC, useState } from 'react';
import { Layout } from 'antd';
import BattleShip from '../../../components/BattleShip';
import { Button } from '../../../shared/ui/Button';

import cls from './gamePage.module.scss';

const { Content } = Layout;

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}

export const GamePage: FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onFullScreen = async () => {
    const header = document.querySelector('.navbar') as HTMLElement | null;

    try {
      if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          await document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          await document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          await document.documentElement.webkitRequestFullscreen();
        }
        setIsFullScreen(true);
        // TODO: передавать в стейт значение для отображения видимости шапки
        if (header) {
          header.style.display = 'none';
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
        setIsFullScreen(false);
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
          {isFullScreen ? 'Отключить полный экран' : 'Включить полный экран'}
        </Button>
      </Content>
    </Layout>
  );
};
