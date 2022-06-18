import { createContext } from 'react';
import type { Scene } from '@babylonjs/core/scene';

export const SceneContext = createContext<Scene | null>(null);
