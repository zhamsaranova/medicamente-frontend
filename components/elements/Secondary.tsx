import {HTMLAttributes} from "react";
import classNames from "classnames";
import styles from "styles/components/elements/Summary.module.scss"

export interface SecondaryProps extends HTMLAttributes<HTMLElement>{
    as?: "span" | "summary" | "p" | "li" | "i",
    noUpper?: boolean
}

function Secondary({as, children, className, noUpper, ...rest}: SecondaryProps) {
    const Tag = as ?? "summary"

    return <Tag className={classNames(className, styles.secondary, {[styles.noUpper]: noUpper})} {...rest}>{children}</Tag>
}

export default Secondary;
