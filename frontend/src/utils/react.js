import React, { useEffect, useState } from "react";

export const ensureElement = Component => {
  if (Component instanceof React.Component || typeof Component === "function") {
    return <Component/>;
  }

  return Component;
};

export const useIsVisible = (elRef) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkVisibility = () => {
      const { bottom } = elRef.current.getBoundingClientRect();
      setIsVisible(bottom < window.innerHeight);
    };

    checkVisibility();
    const intervalId = setInterval(checkVisibility, 1000);
    return () => clearInterval(intervalId);
  }, [elRef]);

  return isVisible;
};

export const useHotReload = (cb) => {
  const [version, incrementVersion] = useState(0);

  useEffect(() => {
    if (module.hot) cb(() => incrementVersion(version + 1));
  }, []);
};
