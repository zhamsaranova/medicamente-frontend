import classNames from "classnames";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "../../styles/components/elements/CustomCursor.module.scss";

export interface CustomCursorProps {
  enabled?: boolean;
}

const cursorVariants: Variants = {
  hidden: {
    scale: 0,
  },
  show: {
    scale: 1,
    transition: {
      bounce: 0,
    },
  },
  down: {
    scale: 0.6,
    transition: {
      bounce: 0,
    },
  },
};

const classes: Record<string, { name: CursorType }> = {
  "cursor-pointer": { name: "pointer" },
  "cursor-common": { name: "common" },
};

export type CursorType = "common" | "pointer" | "no";

function CustomCursor({ enabled = true }: CustomCursorProps) {
  const [pos, setPos] = useState({ x: -1, y: -1 });
  const [element, setElement] = useState<CursorType>();
  const [pointerDown, setPointerDown] = useState(false);

  const cursorShowed = enabled && pos.x != -1 && pos.y != -1 && element;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.x, y: e.y });

      let hover = false;
      for (const c of Object.entries(classes)) {
        if (
          (e.target instanceof HTMLElement || e.target instanceof SVGElement) &&
          (e.target.classList.contains(c[0]) ||
            e.target.closest("." + c[0]) != null) &&
          !e.target.classList.contains("cursor-no") &&
          e.target.closest(".cursor-no") == null
        ) {
          setElement(c[1].name);
          hover = true;
          break;
        }
      }
      if (!hover) setElement(undefined);
    };
    const onLeave = (e: MouseEvent) => {
      setPos({ x: -1, y: -1 });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  useEffect(() => {
    const pointerDown = () => {
      setPointerDown(true);
    };

    const pointerUp = () => {
      setPointerDown(false);
    };

    window.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointerup", pointerUp);

    return () => {
      window.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointerup", pointerUp);
    };
  }, []);

  useEffect(() => {
    if (cursorShowed) document.body.classList.add("noCursor");
    else document.body.classList.remove("noCursor");
  }, [cursorShowed]);

  return (
    <AnimatePresence>
      {cursorShowed && (
        <motion.div
          variants={cursorVariants}
          initial={"hidden"}
          animate={pointerDown ? "down" : "show"}
          exit={"hidden"}
          className={classNames(styles.cursor, styles[element])}
          style={{ left: pos.x, top: pos.y }}>
          <motion.div className={styles.outer} />
          <motion.div className={styles.inner} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CustomCursor;
