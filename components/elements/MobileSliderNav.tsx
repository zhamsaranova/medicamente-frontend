import ArrowButton from "./ArrowButton";
import React from "react";
import styles from "../../styles/components/elements/MobileSliderNav.module.scss"

export interface MobileSliderNavProps {
    onPaginate?: (newDirection: number) => void,
    hideButtons?: boolean
}

function MobileSliderNav({onPaginate, hideButtons = false}: MobileSliderNavProps) {
    return <>{!hideButtons && <nav className={styles.nav}>
        <ArrowButton className={styles.left} aria-label={"Предыдущий слайд"} role={"navigation"} left onClick={() => onPaginate?.(-1)}/>
        <ArrowButton className={styles.right} aria-label={"Следующий слайд"} role={"navigation"} onClick={() => onPaginate?.(1)}/>
    </nav>}</>
}

export default MobileSliderNav;
