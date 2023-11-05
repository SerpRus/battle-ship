import React, { FC, useState } from 'react';
import { Layout } from 'antd';
import BattleShip from '../../../components/BattleShip';
import { Button } from '../../../shared/ui/Button';

import cls from './gamePage.module.scss';

const { Content } = Layout;

export const GamePage: FC = () => {
  const [isToggle, setIsToggle] = useState(false);

  const onFullScreen = () => {
    const header = document.querySelector('nav') as HTMLElement | null;

    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
          setIsToggle(false);
          // TODO: передавать в стейт значение для отображения видимости шапки
          if (header) {
            header.style.display = 'none';
          }
        });
      } else if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsToggle(true);
          if (header) {
            header.style.display = 'block';
          }
        });
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
          {isToggle ? 'Включить полный экран' : 'Отключить полный экран'}
        </Button>
      </Content>
    </Layout>
  );
};
