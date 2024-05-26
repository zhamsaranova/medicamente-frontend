import styles from "../../styles/components/elements/HeaderWithButtons.module.scss";
import Header from "./Header";
import ArrowButton from "./ArrowButton";
import React from "react";

export interface HeaderWithButtonsProps {
    children?: React.ReactNode,
    onPaginate?: (newDirection: number) => void,
    hideButtons?: boolean
}

function HeaderWithButtons({children, onPaginate, hideButtons = false}: HeaderWithButtonsProps) {
    return <div className={styles.header}>
        <Header l={"h2"}>{children}</Header>
        {!hideButtons && <div className={styles.nav}>
            <ArrowButton aria-label={"Предыдущий слайд"} role={"navigation"} left onClick={() => onPaginate?.(-1)}/>
            <ArrowButton aria-label={"Следующий слайд"} role={"navigation"} onClick={() => onPaginate?.(1)}/>
        </div>}
    </div>
}

export default HeaderWithButtons;
