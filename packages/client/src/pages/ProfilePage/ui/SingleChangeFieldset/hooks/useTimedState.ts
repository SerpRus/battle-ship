import { useState } from 'react';

export const useTimedState = (ms: number) => {
  const [state, setState] = useState(false);
  const setTimedState = () => {
    setState(true);
    setTimeout(() => setState(false), ms);
  };

  return [state, setTimedState] as [boolean, () => void];
};
