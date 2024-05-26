import {useEffect, useRef} from "react";
import {useMotionValue, useSpring} from "framer-motion";

export interface AnimatedNumberFramerMotionProps {
    initial?: number
    children: number
}

function AnimatedNumber({children, initial}: AnimatedNumberFramerMotionProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(initial ?? 0);
    const springValue = useSpring(motionValue, {stiffness: 100, damping: 80, bounce: 0});

    useEffect(() => {
        motionValue.set(children);
    }, [motionValue, children]);

    useEffect(
        () =>
            springValue.onChange((latest) => {
                if (ref.current) {
                    ref.current.textContent = latest.toFixed(0);
                }
            }),
        [springValue]
    );

    return <span ref={ref} />;
}

export default AnimatedNumber;
