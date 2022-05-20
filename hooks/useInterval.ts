import React from "react";

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = React.useRef<() => void>(null!);
  React.useEffect(() => {
    savedCallback.current = callback;
  });

  React.useEffect(() => {
    const tick = () => savedCallback.current();

    if (delay === null) return;
    const interval = setInterval(tick, delay);
    return () => clearInterval(interval);
  }, [delay]);
};

export default useInterval;
