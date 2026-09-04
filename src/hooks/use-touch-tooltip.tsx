import * as React from "react";

// Matches Tailwind `lg` breakpoint used for the card layout.
const TOUCH_TOOLTIP_BREAKPOINT = 1024;

export function useTouchTooltip() {
  const [needsTouchTooltip, setNeedsTouchTooltip] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const update = () => {
      const narrowViewport = window.innerWidth < TOUCH_TOOLTIP_BREAKPOINT;
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      setNeedsTouchTooltip(narrowViewport || coarsePointer);
    };

    const widthQuery = window.matchMedia(`(max-width: ${TOUCH_TOOLTIP_BREAKPOINT - 1}px)`);
    const pointerQuery = window.matchMedia("(pointer: coarse)");

    update();
    widthQuery.addEventListener("change", update);
    pointerQuery.addEventListener("change", update);

    return () => {
      widthQuery.removeEventListener("change", update);
      pointerQuery.removeEventListener("change", update);
    };
  }, []);

  return !!needsTouchTooltip;
}
