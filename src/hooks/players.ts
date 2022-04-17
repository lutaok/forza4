import { useCallback, useState } from 'react';

export const useSwapTurns = (initialState: string = 'p1'): [string, () => void] => {
  const [player, setPlayer] = useState(initialState);

  const swapPlayer = useCallback(() => {
    setPlayer((prevPlayer) => {
      if (prevPlayer === 'p1') {
        prevPlayer = 'p2';
      } else {
        prevPlayer = 'p1';
      }
      return prevPlayer;
    });
  }, []);
  return [player, swapPlayer];
};
