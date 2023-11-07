import * as renderer from 'react-test-renderer';
import 'jest-canvas-mock';
import React from 'react';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import BattleShip from '.';

configure({ adapter: new Adapter() });
type TObjeect = Record<string, unknown>;
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

  /* const realUseState = React.useState
      const stubInitialState1 = 'start'
      const stubInitialState2: any[] = []
      const stubInitialState3 = []
      const stubInitialState4 = false
      
      const [gameStep, setGameStep] = React.useState();
      const [playerShips, setPlayerShips] = React.useState();
      const [computerShips, setComputerShips] = React.useState();
      const [isPlayerWin, setIsPlayerWin] = React.useState();

      React.useState = jest.fn()
        .mockReturnValueOnce([stubInitialState1, {}])
        .mockReturnValueOnce([stubInitialState2, {}]) */

  /* // Mock useState before rendering your component
      jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => realUseState(stubInitialState)) */

  beforeEach(() => {
    wrapper = shallow(<BattleShip />);
    jest.restoreAllMocks();
    jest.resetAllMocks();
    // const canvasElement = canvas;
    // if (!canvasElement) {
    //     return;
    // }

    // const ctx = canvasElement.getContext('2d');

    // if (!ctx) {
    //     return;
    // }

    // ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    // ctx.beginPath();

    // currentStep = new StartStep(
    //     ctx,
    //     canvasElement,
    //     setGameStep,
    //     setPlayerShips as React.Dispatch<React.SetStateAction<ShipsType>>,
    //     playerShips,
    //     setComputerShips as React.Dispatch<React.SetStateAction<ShipsType>>
    // );
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

  /* it('renders correctly', () => {
        const tree = renderer
            .create(
                <canvas
                    width={1041}
                    height={601}
                    onClick={e => {
                        if (clickRef.current) {
                        clickRef.current(e);
                        }
                    }}
                />
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('currentStep instance of StartStep', () => {
        expect(currentStep).toBeInstanceOf(StartStep);
    });

    it('currentStep instance of StartStep', () => {
        const spyCurrentStep = jest.spyOn(currentStep, 'clickHandler');
        currentStep.isGameStartButtonClick( 522, 570 );
        expect(spyCurrentStep).toBeCalledTimes(1);
    }); */
});

// describe('StartStep', () => {
//     let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
//     let currentStep: StartStep;

//     const canvas: HTMLCanvasElement = document.createElement('canvas');
//     const clickRef: {current: null | ((e: React.MouseEvent<HTMLElement>) => void)} = {current: null}
//     canvas.width = 1041;
//     canvas.height = 601;
//     canvas.onclick =(e) => {
//         if (clickRef.current) {
//           clickRef.current(e as unknown as React.MouseEvent<HTMLElement>);
//         }
//     }

//     beforeEach(
//         () => {
//             jest.restoreAllMocks();
//             jest.resetAllMocks();
//             const canvasElement = canvas;
//             if (!canvasElement) {
//                 return;
//             }

//             const ctx = canvasElement.getContext('2d');

//             if (!ctx) {
//                 return;
//             }

//             ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//             ctx.beginPath();
//             let gameStep = 'start';
//             let playerShips: any[] = [];
//             const setGameStep = jest.fn();
//             const setPlayerShips = jest.fn();
//             const setComputerShips = jest.fn();
//             const useStateSpy = jest.spyOn(React, 'useState')
//                 useStateSpy.mockImplementation(() => [gameStep, setGameStep])
//                 useStateSpy.mockImplementation(() => [playerShips, setPlayerShips]);
//             currentStep = new extStartStep(
//                 ctx,
//                 canvasElement,
//                 setGameStep,
//                 setPlayerShips as React.Dispatch<React.SetStateAction<ShipsType>>,
//                 playerShips,
//                 setComputerShips as React.Dispatch<React.SetStateAction<ShipsType>>
//             );
//         }
//     )

//     it('renders correctly', () => {
//         const tree = renderer
//            .create(
//                 <canvas
//                     width={1041}
//                     height={601}
//                     onClick={e => {
//                         if (clickRef.current) {
//                         clickRef.current(e);
//                         }
//                     }}
//                 />
//             )
//            .toJSON();

//         expect(tree).toMatchSnapshot();
//     });

//     it('called clickHandler', () => {

//         //const spyClickHandler = jest.spyOn(currentStep, 'clickHandler');
//         currentStep.isGameStartButtonClick( 522, 570 );
//         expect(currentStep.isGameStartButtonClick).toBeCalledTimes(1);
//     });

// });
