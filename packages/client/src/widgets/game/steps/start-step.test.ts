import 'jest-canvas-mock';
import React from 'react';
import StartStep from './start-step';

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

const canvasElement = canvas;

const ctx = canvasElement.getContext('2d');

ctx!.clearRect(0, 0, canvasElement.width, canvasElement.height);
ctx!.beginPath();
class TestEntity extends StartStep {
  public constructor() {
    super(ctx!, canvasElement, () => 'start');
  }
}

describe('AbstractEntity', () => {
  it('create an instance of AbstractEntity', () => {
    const testEntity = new TestEntity();

    expect(testEntity).toBeInstanceOf(TestEntity);
  });

  it('isGameStartButtonClick - true', () => {
    const testEntity2 = new TestEntity();
    const resultLow = testEntity2.isGameStartButtonClick(521, 521);
    const resultHigh = testEntity2.isGameStartButtonClick(640, 561);
    expect(resultLow).toBe(true);
    expect(resultHigh).toBe(true);
  });

  it('isGameStartButtonClick - false', () => {
    const testEntity2 = new TestEntity();
    const resultLowY = testEntity2.isGameStartButtonClick(521, 520);
    const resultHighY = testEntity2.isGameStartButtonClick(521, 562);
    const resultLowX = testEntity2.isGameStartButtonClick(520, 521);
    const resultHighX = testEntity2.isGameStartButtonClick(641, 521);
    expect(resultLowY).toBe(false);
    expect(resultHighY).toBe(false);
    expect(resultLowX).toBe(false);
    expect(resultHighX).toBe(false);
  });
});
