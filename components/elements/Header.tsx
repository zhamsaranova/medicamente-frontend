import {HTMLAttributes, useEffect, useRef} from "react";
import classNames from "classnames";
import styles from "../../styles/components/elements/Header.module.scss"
import Image from "next/image";
import Arrow from "assets/arrowRightBlack.svg";


export interface HeaderProps extends HTMLAttributes<HTMLElement> {
    as?: "h1" | "h2" | "h3" | "h4" | "h5",
    l?: "h1" | "h2" | "h3" | "h4" | "h5",
    arrow?: boolean,
    textMargins?: boolean
}

function Header({as, children, className, l, arrow, textMargins, ...head}: HeaderProps) {
    const Tag = as ?? (l ?? "h2")

    const spanRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
      if (spanRef.current?.parentNode instanceof HTMLElement) {
          spanRef.current?.parentNode.style.setProperty("width", spanRef.current.offsetWidth + 1 + "px")
      }
    });

    return <Tag className={classNames(className, styles[l ?? "h2"], styles.header, {[styles.arrow]: arrow, [styles.textMargins]: textMargins})} {...head}>
        {arrow ? <span><span ref={spanRef}>{children}</span></span> : children}
        {arrow && <Image src={Arrow} alt={""}/>}
    </Tag>
}

export default Header;
