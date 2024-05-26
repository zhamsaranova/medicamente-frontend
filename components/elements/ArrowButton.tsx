import {ButtonHTMLAttributes} from "react";
import classNames from "classnames";
import styles from "../../styles/components/elements/ArrowButton.module.scss";
import Arrow from "./Arrow";

export interface ArrowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    left?: boolean,
    reduced?: boolean
}

function ArrowButton({className, left, reduced, ...button}: ArrowButtonProps) {
    return <button className={classNames(className, styles.button, {[styles.left]: left, [styles.reduced]: reduced})} {...button}>
       <Arrow/>
    </button>
}

export default ArrowButton;
