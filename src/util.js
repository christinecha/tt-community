import debounce from "lodash.debounce";
import React, { useLayoutEffect, useState } from "react";

const getMobile = () => window.innerWidth < 768;

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(getMobile());

  useLayoutEffect(() => {
    const onResize = debounce(() => {
      setIsMobile(getMobile);
    }, 500);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return { isMobile };
};
