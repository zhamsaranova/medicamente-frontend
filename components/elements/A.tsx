import styles from "../../styles/components/elements/A.module.scss"
import classNames from "classnames";
import React, {AnchorHTMLAttributes} from "react";
import Link, {LinkProps} from "next/link";

export interface AProps extends AnchorHTMLAttributes<HTMLAnchorElement> {

}

function A({className, children, ...a}: AProps) {
    return <a {...a} className={classNames(styles.a, className)}>{children}</a>
}

export default A;

export function LinkA({className, children, ...props}: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return <Link scroll={false} {...props} className={classNames(styles.a, className)}>{children}</Link>
}
