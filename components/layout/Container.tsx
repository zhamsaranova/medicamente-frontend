import React, {HTMLAttributes, useContext, useEffect, useState} from "react";
import styles from "../../styles/components/layout/Container.module.scss";
import classNames from "classnames";
import {HTMLMotionProps, motion, Variants} from "framer-motion";
import {GlobalContext} from "../../pages/_app";

const contentVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 100
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            bounce: 0,
            duration: 0.7
        }
    }
}

const contentOpacityVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
    }
}

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode,
    className?: string,
    noPadding?: boolean,
    noTopPadding?: boolean,
    as?: "div" | "section" | "nav" | "footer",
    opacity?: boolean,
    observerMargin?: string
    contentProps?: HTMLMotionProps<"div">,
    text?: boolean
}

function Container({noPadding, className, children, as, contentProps, opacity, observerMargin, noTopPadding, text, ...divProps} : ContainerProps) {
    const Tag = as ?? "section";
    const global = useContext(GlobalContext)
    const [startAnimation, setStartAnimation] = useState(global.loadingCompleted)
    useEffect(() => {
        if (global.loadingCompleted) {
            const id = setTimeout(() => {
                setStartAnimation(true)
            }, 200)

            return () => clearInterval(id)
        }
    }, [global.loadingCompleted])

    return <Tag data-scroll-section={''} {...divProps} className={classNames(styles.container, className, {[styles.noPadding]: noPadding, [styles.noTopPadding]: noTopPadding, [styles.text]: text}, {[styles.nav]: as == "nav"})}>
        <motion.div variants={!opacity ? contentVariants : contentOpacityVariants} initial={"hidden"} animate={"hidden"} whileInView={startAnimation ? "show" : "hidden"} viewport={{once: true, margin: observerMargin ?? "0px"}} {...contentProps} className={classNames(styles.content, contentProps?.className)}>
            {children}
        </motion.div>
    </Tag>
}

export default Container;
