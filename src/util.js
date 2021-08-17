import debounce from "lodash.debounce";
import React, { useContext, useLayoutEffect, useState } from "react";

const getMobile = () => {
  const isMobile = window.innerWidth < 768;

  // Magic side effects
  if (isMobile) {
    const innerHeight = window.innerHeight;
    console.log(innerHeight);
    document.body.style.height = `${innerHeight}px`;
  } else {
    document.body.style.removeProperty("height");
  }

  return isMobile;
};

const Mobile = React.createContext(getMobile());
export const useMobile = () => useContext(Mobile);
export const MobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(getMobile());

  useLayoutEffect(() => {
    const onResize = debounce(() => {
      const newIsMobile = getMobile();
      setIsMobile(newIsMobile);
    }, 500);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return <Mobile.Provider value={isMobile}>{children}</Mobile.Provider>;
};
