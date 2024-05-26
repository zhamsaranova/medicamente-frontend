import {motion, SVGMotionProps} from "framer-motion";
import {MouseEventHandler, RefAttributes} from "react";

const Path = (props: JSX.IntrinsicAttributes & SVGMotionProps<SVGPathElement> & RefAttributes<SVGPathElement>) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
);

export interface ToggleProps {
    toggle: MouseEventHandler<HTMLButtonElement>,
    toggled: boolean
}

export function Toggle ({ toggle, toggled }: ToggleProps) {
    return <button aria-label={"Меню"} onClick={toggle}>
        <motion.svg initial={"closed"} animate={toggled ? "open" : "closed"} width="23" height="23" viewBox="0 0 23 23">
            <Path
                variants={{
                    closed: {d: "M 2 2.5 L 20 2.5"},
                    open: {d: "M 3 16.5 L 17 2.5"}
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: {opacity: 1},
                    open: {opacity: 0}
                }}
                transition={{duration: 0.1}}
            />
            <Path
                variants={{
                    closed: {d: "M 2 16.346 L 20 16.346"},
                    open: {d: "M 3 2.5 L 17 16.346"}
                }}
            />
        </motion.svg>
    </button>
}

