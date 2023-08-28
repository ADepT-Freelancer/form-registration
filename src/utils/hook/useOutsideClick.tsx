import { useEffect, useLayoutEffect, useRef } from "react";

export function useLatest(value: any) {
  const valueRef = useRef(value);

  useLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
}

export function useOutsideClick(
  elementRef: React.MutableRefObject<any>,
  handler: () => void,
  attached = true
) {
  const latestHandler = useLatest(handler);

  useEffect(() => {
    if (!attached) return;

    const handleClick = (e: any) => {
      if (!elementRef.current) return;

      if (!elementRef.current.contains(e.target)) {
        latestHandler.current();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [elementRef, latestHandler, attached]);
}
