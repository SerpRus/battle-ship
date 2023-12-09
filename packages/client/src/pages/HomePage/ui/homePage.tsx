import { useCallback } from 'react';
import { Layout } from 'antd';
import cls from './homePage.module.scss';
import { RoutePath } from '../../../app/providers/router/routeConfig';
import seabattleImg from '../seabattle.png';
import { useOAuth } from '../../../app/providers/OAuth/helpers/useOAuth';

const { Content } = Layout;

export const HomePage = () => {
  useOAuth();

  const onClick = useCallback(() => {
    window.location.replace(RoutePath.game);
  }, []);

  return (
    <Layout className={cls.wrapper}>
      <Content className={cls.content}>
        <div className={cls.description}>
          <p>
            <span className={cls.description_bold}>«Морской бой»</span>– игра
            для двух участников, в которой игроки по очереди называют координаты
            на карте соперника. Если у врага с этими координатами имеется
            корабль, то корабль или его палуба (дека) убивается, попавший делает
            еще один ход.
          </p>
          <p>
            <span className={cls.description_bold}>Цель игрока:</span> первым
            убить все игровые корабли врага Партии
          </p>
          <p>
            <span className={cls.description_bold}>Игровое поле:</span> у
            каждого игрока имеется свое Игровое поле в виде квадрата, на котором
            размещается флот кораблей. Горизонтали обычно нумеруются сверху
            вниз, а вертикали помечаются буквами слева направо. При этом
            используются буквы русского алфавита от «а» до «к» (буквы «ё» и «й»
            обычно пропускаются) либо от «а» до «и» (с использованием буквы
            «ё»), либо буквы латинского алфавита от «a» до «j».
          </p>
          <p>
            <span className={cls.description_bold}>Размещаются:</span>
          </p>
          <ul>
            <li>1 корабль — ряд из 4 клеток («четырёхпалубный»; линкор)</li>
            <li>2 корабля — ряд из 3 клеток («трёхпалубные»; крейсера)</li>
            <li>3 корабля — ряд из 2 клеток («двухпалубные»; эсминцы)</li>
            <li>4 корабля — 1 клетка («однопалубные»; торпедные катера)</li>
          </ul>
          <div className={cls.button_wrapper}>
            <button className={cls.button} type="button" onClick={onClick}>
              Играть
            </button>
          </div>
        </div>
        <div className={cls.img_wrapper}>
          <img className={cls.img} src={seabattleImg} alt="морской бой" />
        </div>
      </Content>
    </Layout>
  );
};
