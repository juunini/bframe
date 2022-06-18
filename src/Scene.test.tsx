import React from 'react';
import { render } from '@testing-library/react';
import { Engine } from '@babylonjs/core/Engines/engine';

import Scene from './Scene';

jest.mock('@babylonjs/core/scene');
jest.mock('@babylonjs/core/Engines/engine');

Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 200 });

describe('Scene', () => {
  test('renders', () => {
    render(<Scene />);
  });

  // @ts-ignore
  context('When window is resize', () => {
    it('Should calls engine.resize', () => {
      Engine.prototype.resize = jest.fn();

      render(<Scene />);

      expect(Engine.prototype.resize).not.toBeCalled();

      // @ts-ignore
      global.innerWidth = 500;
      // @ts-ignore
      global.dispatchEvent(new Event('resize'));

      expect(Engine.prototype.resize).toBeCalled();
    });
  });
});
