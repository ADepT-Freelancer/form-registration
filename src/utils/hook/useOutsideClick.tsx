import { useLayoutEffect, useEffect, useRef, useState } from "react";

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

// function Tooltip({ opened, onClose }) {
//   const tooltipRef = useRef(null);

//   useOutsideClick(tooltipRef, onClose, opened);

//   if (!opened) return null;

//   return (
//     <div ref={tooltipRef} className="tooltip">
//       <div>Some Text</div>
//     </div>
//   );
// }

// export default function App() {
//   const [opened, setOpened] = useState(false);

//   const onClose = () => {
//     setOpened(false);
//   };

//   return (
//     <div className="tooltip-container">
//       <Tooltip opened={opened} onClose={onClose} />
//       <button
//         className="tooltip-trigger"
//         onClick={() => {
//           setOpened((v) => !v);
//         }}
//       >
//         Click to open tooltip
//       </button>
//     </div>
//   );
// }
