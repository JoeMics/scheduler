/* 
 * take an initial mode
 * set "mode" state with intial mode provided
 * return an object with mode property 
 */

import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      // add mode to the history 
      setHistory((prev) => [...prev, newMode]);
    } else {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    }
    // update mode state using setMode
    setMode(newMode);
  };

  const back = () => {
    // go back to previous mode
    setHistory((prev) => {
      // prevents going back if at initial
      if (prev.length === 1) {
        return prev;
      }

      const newHistory = [...prev.slice(0, -1)];

      // update current mode
      setMode(...newHistory.slice(-1));

      // update history
      return newHistory;
    });
  };

  return {
    mode,
    transition,
    back,
    history,
  };
};

export default useVisualMode;