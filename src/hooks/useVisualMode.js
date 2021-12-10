// take an initial mode
// set "mode" state with intial mode provided
// return an object with mode property

import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    // take in new mode as parameter
    // add mode to the history 
    setHistory((prev) => [...history, newMode]);
    // update mode state using setMode
    setMode((prev) => newMode);
  };

  const back = () => {
    // go back to previous mode
    setHistory((prev) => {
      // prevents going back if at initial
      if (prev.length === 1) {
        return prev;
      }

      const newHistory = [...prev.slice(0, prev.length - 1)];

      // update current mode
      setMode(newHistory[newHistory.length - 1]);
      return newHistory;
    });
  };

  return {
    mode,
    transition,
    back,
  };
};

export default useVisualMode;