import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // a function that save transition into history and
  // updates the mode
  const transition = function(tmode, replace = false) {
    setHistory((prev) => {
      if (replace) prev.pop();
      return [...prev, tmode];
    });

    setMode(tmode);
  };

  // the function goes delete to the last transition history and
  // updates the mode to the older transition
  const back = function() {
    setHistory((prev) => {
      prev.pop();
      setMode(history[prev.length - 1]);
      return [...prev];
    });
  };

  return { mode, transition, back };
};
