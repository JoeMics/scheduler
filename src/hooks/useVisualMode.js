// take an initial mode
// set "mode" state with intial mode provided
// return an object with mode property

import { useState } from 'react';

const useVisualMode = (initMode) => {
  const [mode, setMode] = useState(initMode);

  const transition = (newMode) => {
    // take in new mode as parameter
    // update mode state using setMode
    setMode((prev) => newMode);
  };

  return {
    mode,
    transition,
  };
};

export default useVisualMode;