import styles from "../../styles/components/elements/Checkbox.module.scss"
import {ButtonHTMLAttributes, HTMLAttributes, useId, useState} from "react";
import classNames from "classnames";

export interface CheckboxProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    containerProps?: HTMLAttributes<HTMLDivElement>,
    checked?: boolean,
    onChecked?: (c: boolean) => void,
    error?: boolean,
    white?: boolean
}

function Checkbox({children, containerProps, onChecked, checked, error, white, ...input}: CheckboxProps) {
    const [checkedInner, setChecked] = useState(false)
    const checkedTrue = checked ?? checkedInner;
    const id = useId()

    return <div onClick={() => !!onChecked ? onChecked(!checkedTrue) : setChecked(!checkedTrue)} {...containerProps} className={classNames(styles.container, containerProps?.className, {[styles.error]: error, [styles.white]: white})}>
        <div className={styles.button}>
            <button aria-labelledby={id} className={classNames(input.className, {[styles.checked]: checkedTrue})} {...input} type={"button"}/>
        </div>
        <label id={id}>{children}</label>
    </div>
}

export default Checkbox;
