import React, { forwardRef } from 'react';
import type { ForwardedRef } from 'react';

const CANVAS_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

interface Props {
  children?: React.ReactNode;
}

function Canvas(
  { children }: Props,
  ref: ForwardedRef<HTMLCanvasElement>,
): JSX.Element {
  return (
    <canvas
      ref={ref}
      style={CANVAS_STYLE}
    >
      {children}
    </canvas>
  );
}

export default forwardRef(Canvas);
