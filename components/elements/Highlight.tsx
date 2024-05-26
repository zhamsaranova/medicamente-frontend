import styles from "styles/components/elements/Highlight.module.scss";
import classNames from "classnames";
import {HTMLAttributes} from "react";

export interface HighlightProps extends HTMLAttributes<HTMLSpanElement>{

}

function Highlight({className, children, ...span}: HighlightProps) {
    return <span {...span} className={classNames(className, styles.highlight)}>
        {children}
    </span>
}

export default Highlight;
