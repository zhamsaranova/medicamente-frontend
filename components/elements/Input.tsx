import React, {
  ForwardedRef,
  HTMLAttributes,
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import styles from "../../styles/components/elements/Input.module.scss";
import InputMask, { Props as InputMaskProps } from "react-input-mask-format";

export interface InputProps extends InputMaskProps {
  label: string;
  search?: boolean | "submit";
  containerProps?: HTMLAttributes<HTMLDivElement>;
  error?: boolean;
  alwaysMask?: boolean;
  white?: boolean;
}

export interface InputRef {
  inputRef: RefObject<HTMLInputElement>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      search,
      containerProps,
      onChange,
      value,
      error,
      alwaysMask,
      white,
      ...input
    },
    ref,
  ) => {
    const [focus, setFocus] = useState(false);
    const [innerValue, setValue] = useState("");
    const filled = value ?? innerValue;

    return (
      <div
        {...containerProps}
        className={classNames(
          containerProps?.className,
          styles.container,
          { [styles.focus]: focus },
          { [styles.filled]: filled },
          { [styles.error]: error },
          { [styles.white]: white },
        )}>
        {input.mask || alwaysMask ? (
          <InputMask
            placeholder={label}
            inputRef={ref}
            value={value ?? innerValue}
            onChange={(e) =>
              onChange ? onChange(e) : setValue(e.target.value)
            }
            {...input}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        ) : (
          <input
            placeholder={label}
            ref={ref}
            value={value ?? innerValue}
            onChange={(e) =>
              onChange ? onChange(e) : setValue(e.target.value)
            }
            {...input}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
