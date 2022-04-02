import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { ChartContext } from "./ChartContext";

export function Chart({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (ref.current) {
      const size = ref.current.getBoundingClientRect();
      setSize(size);
    }
  }, []);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="charts-Chart" ref={ref}>
      <svg width={size.width} height={size.height}>
        <ChartContext.Provider
          value={{ width: size.width, height: size.height }}
        >
          {children}
        </ChartContext.Provider>
      </svg>
    </div>
  );
}
