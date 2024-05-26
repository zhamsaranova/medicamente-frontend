import styles from "../../styles/components/elements/VerticalArrow.module.scss"
import {ButtonHTMLAttributes} from "react";
import classNames from "classnames";

export interface VerticalArrowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    down?: boolean
}

function VerticalArrow({className, down, ...button}: VerticalArrowProps) {
    return <button {...button} className={classNames(styles.arrow, className)}>
        <svg className={classNames({[styles.down]: down})} width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_199_1411)">
                <path d="M9.75 21L9.75 3" stroke="#0D77EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.75 6L9.75 3" stroke="#0D77EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.75 6L9.75 3" stroke="#0D77EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_199_1411">
                    <rect width="24" height="18" fill="white" transform="translate(0.75 24) rotate(-90)"/>
                </clipPath>
            </defs>
        </svg>

    </button>
}

export default VerticalArrow;
