import {
  AnimatePresence,
  motion,
  useDragControls,
  Variants,
} from "framer-motion";
import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

const variants: Variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export const swipeConfidenceThreshold = 10000;
export const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export const paginate = <T,>(
  array: T[],
  page_size: number,
  page_number: number,
) => {
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
};

export interface SliderProps {
  children: (page: number, dragging: boolean) => React.ReactNode;
  onSlide?: () => void;
  disabled?: boolean;
  hard?: boolean;
}

export interface SliderRef {
  paginate: (newDirection: number) => void;
}

const Slider = forwardRef(
  (
    { children, onSlide, disabled, hard = false }: SliderProps,
    ref: ForwardedRef<SliderRef>,
  ) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const [dragging, setDragging] = useState(false);
    const dragControls = useDragControls();

    const paginate = (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
      onSlide?.();
    };

    useImperativeHandle(ref, () => ({
      paginate,
    }));

    return (
      <>
        <AnimatePresence initial={false} custom={direction} mode={"sync"}>
          <motion.li
            style={!disabled ? { cursor: "grab" } : {}}
            whileTap={!disabled ? { cursor: "grabbing" } : {}}
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag={!disabled ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragControls={dragControls}
            dragListener={true}
            dragElastic={1}
            onDragStart={(e, info) => {
              if (
                e.target instanceof HTMLElement &&
                (e.target.classList.contains("noDrag") ||
                  e.target.closest(".noDrag") != null)
              ) {
                // @ts-ignore
                dragControls.componentControls.forEach((entry) => {
                  entry.stop(e, info);
                });
              } else {
                setDragging(true);
              }
            }}
            onDragEnd={(e, { offset, velocity }) => {
              // e.preventDefault()
              // e.stopPropagation()
              const swipe = swipePower(offset.x, velocity.x);

              if (
                swipe <
                (!hard
                  ? -swipeConfidenceThreshold
                  : -swipeConfidenceThreshold * 2)
              ) {
                paginate(1);
              } else if (
                swipe >
                (!hard
                  ? swipeConfidenceThreshold
                  : swipeConfidenceThreshold * 2)
              ) {
                paginate(-1);
              }

              setDragging(false);
            }}>
            {children(page, dragging)}
          </motion.li>
        </AnimatePresence>
      </>
    );
  },
);

Slider.displayName = "Slider";

export default Slider;
