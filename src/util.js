import debounce from "lodash.debounce";
import React, { useContext, useLayoutEffect, useState } from "react";

const getMobile = () => {
  const isMobile = window.innerWidth < 768;
  return isMobile;
};

const Mobile = React.createContext(getMobile());
export const useMobile = () => useContext(Mobile);
export const MobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(getMobile());

  useLayoutEffect(() => {
    if (isMobile && navigator.userAgentData && navigator.userAgentData.mobile) {
      const innerHeight = window.innerHeight;
      document.body.style.height = `${innerHeight}px`;
    }

    const onResize = debounce(() => {
      const newIsMobile = getMobile();
      setIsMobile(newIsMobile);
    }, 500);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <Mobile.Provider value={isMobile}>{children}</Mobile.Provider>;
};

export const FakeLink = ({ to, children, ...rest }) => {
  return (
    <a href={to} data-fake-link={true} {...rest}>
      {children}
    </a>
  );
};

export const getLocaleString = (club) => {
  if (!club.country) return "anywhere";
  if (!club.state && !club.province) return `in ${club.country}`;
  if (club.state) return `in ${club.state}`;
  if (club.province) return `in ${club.province}`;
};
