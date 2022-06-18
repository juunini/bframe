import React, { useEffect, useRef, useState } from 'react';

import { Scene as BabylonScene } from '@babylonjs/core/scene';
import { Engine } from '@babylonjs/core/Engines/engine';

import type { EngineOptions } from '@babylonjs/core/Engines/thinEngine';
import type { SceneOptions } from '@babylonjs/core/scene';
import { CanvasContext } from './hooks/canvas';
import { EngineContext } from './hooks/engine';
import { SceneContext } from './hooks/scene';
import Canvas from './Canvas';

interface Props {
  children?: React.ReactNode;
  antialias?: boolean;
  sceneOptions?: SceneOptions;
  engineOptions?: EngineOptions;
}

export default function Scene({
  children,
  antialias,
  sceneOptions,
  engineOptions,
}: Props): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState<Engine | null>(null);
  const [scene, setScene] = useState<BabylonScene | null>(null);

  useEffect(() => {
    const currentEngine = new Engine(canvasRef.current!, antialias, engineOptions);
    const currentScene = new BabylonScene(engine!, sceneOptions);

    currentEngine.runRenderLoop(() => currentScene.render());

    setEngine(currentEngine);
    setScene(currentScene);

    window.addEventListener('resize', () => {
      currentEngine.resize();
    });
  }, []);

  return (
    <CanvasContext.Provider value={canvasRef.current}>
      <EngineContext.Provider value={engine}>
        <SceneContext.Provider value={scene}>
          <Canvas ref={canvasRef}>
            {children}
          </Canvas>
        </SceneContext.Provider>
      </EngineContext.Provider>
    </CanvasContext.Provider>
  );
}
