import * as renderer from 'react-test-renderer';
import 'jest-canvas-mock';
import React from 'react';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import BattleShip from './index';

type TObjeect = Record<string, unknown>;

configure({ adapter: new Adapter() });

describe('Game', () => {
  let wrapper: ShallowWrapper<
    any,
    Readonly<TObjeect>,
    React.Component<TObjeect, TObjeect, any>
  >;

  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const clickRef: {
    current: null | ((e: React.MouseEvent<HTMLElement>) => void);
  } = { current: null };
  canvas.width = 1041;
  canvas.height = 601;
  canvas.onclick = e => {
    if (clickRef.current) {
      clickRef.current(e as unknown as React.MouseEvent<HTMLElement>);
    }
  };

  beforeEach(() => {
    wrapper = shallow(<BattleShip />);
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<BattleShip />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('width of canvas element is correctly', () => {
    const bool = wrapper.find(HTMLCanvasElement).props().width === 1041;
    wrapper.update();
    expect(bool).toBe(true);
  });
});
