import { useRef, useEffect } from 'react';

import startScreen from '../game/screens/start-screen';

export default function Canvas() {
  const canvas = useRef<null | HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvas.current?.getContext('2d');

    if (!ctx) {
      return;
    }

    startScreen(ctx);
  }, []);

  return (
    <canvas ref={canvas} width={1300} height={800}/>
  );
};
