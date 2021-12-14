import { useState } from "react";
// import useVisualMode from "hooks/useVisualMode";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(tmode, replace = false) {
    setHistory((prev) => {
      if (replace) prev.pop();
      return [...prev, tmode];
    });

    setMode(tmode);
  };

  const back = function() {
    setHistory((prev) => {
      prev.pop();
      setMode(history[prev.length - 1]);
      return [...prev];
    });
  };

  return { mode, transition, back };
};
