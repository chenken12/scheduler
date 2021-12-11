import { useState } from "react";
// import useVisualMode from "hooks/useVisualMode";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(tmode, replace = false) {
    const tran = [...history];
    if (replace) tran.pop();

    setHistory([...tran, tmode]);
    setMode(tmode);
  };

  const back = function() {
    const back = [...history];
    back.pop();
    
    setHistory([...back]);
    setMode(back[back.length - 1]);
  };

  return { mode, transition, back };
}