import { useEffect, useRef } from "react";

export const useInfiniteScroll = (onScrollEndCallback: () => Promise<any>) => {
  const waitingRef = useRef(false);

  useEffect(() => {
    const handleInfiniteScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;

      if (!bottomOfWindow || waitingRef.current) {
        return;
      }

      console.log("queued");
      waitingRef.current = true;
      onScrollEndCallback().finally(() => {
        waitingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [onScrollEndCallback]);
};
