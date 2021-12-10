// take an initial mode
// set "mode" state with intial mode provided
// return an object with mode property

import { useState } from 'react';

const useVisualMode = (initMode) => {
  const [mode, setMode] = useState(initMode);

  return {
    mode,
  };
};

export default useVisualMode;