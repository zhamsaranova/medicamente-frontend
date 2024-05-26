import { AnimatePresence, motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import LocomotiveScroll from "locomotive-scroll";
import { useRouter } from "next/router";

const variants: Variants = {
  hidden: { opacity: 0, x: 0, y: 100 },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      bounce: 0,
    },
  },
  exit: {
    opacity: 0,
    x: 0,
    y: -100,
    transition: {
      bounce: 0,
    },
  },
};

export interface AnimationLayoutProps {
  children: ReactNode;
}

function AnimationLayout(props: AnimationLayoutProps) {
  const { scroll }: { scroll: LocomotiveScroll } = useLocomotiveScroll();
  const { asPath } = useRouter();

  return (
    <AnimatePresence initial={false} mode={"wait"}>
      <motion.div
        style={{ width: "100vw" }}
        key={asPath.split("#")[0].split("?")[0]}
        variants={variants}
        onAnimationStart={(e) => {
          scroll && scroll.stop();
        }}
        onAnimationComplete={(e) => {
          scroll && scroll.update();
          scroll && scroll.start();
          let hash = asPath.split("#")[1];
          scroll && (scroll as any).setScroll(0, 0);
          scroll && scroll.scrollTo("top", { disableLerp: true, duration: 0 });
          setTimeout(() => {
            scroll && scroll.scrollTo("#smooth-" + hash, { offset: -50 });
          }, 100);
        }}
        initial={"hidden"}
        animate={"enter"}
        exit={"exit"}>
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimationLayout;
