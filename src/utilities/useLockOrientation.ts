import { useLayoutEffect } from "react";

export function useLockOrientation(orientation: OrientationLockType) {
  useLayoutEffect(() => {
    const lock = (async () => {
      try {
        await window.screen.orientation.lock(orientation);
        return true;
      } catch {
        return false;
      }
    })();

    return () => {
      (async () => {
        const locked = await lock;

        if (locked) {
          window.screen.orientation.unlock();
        }
      })();
    };
  }, []);
}
