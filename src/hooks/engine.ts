import { createContext } from 'react';
import type { Engine } from '@babylonjs/core/Engines/engine';

export const EngineContext = createContext<Engine | null>(null);
