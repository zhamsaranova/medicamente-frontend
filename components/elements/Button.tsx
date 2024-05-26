import styles from "../../styles/components/elements/Button.module.scss";
import { HTMLAttributes, useContext } from "react";
import classNames from "classnames";
import Arrow from "assets/arrowWhiteRight.svg";
import Image from "next/image";
import Link from "next/link";
import { GlobalContext } from "../../pages/_app";

export interface ButtonProps extends HTMLAttributes<HTMLElement> {
  as?: "button" | "a" | "link";
  disabled?: boolean;
  arrow?: boolean;
  href?: string;
  target?: string;
  white?: boolean;
}

function Button({
  as,
  className,
  children,
  disabled,
  arrow,
  href,
  target,
  white,
  ...rest
}: ButtonProps) {
  const global = useContext(GlobalContext);
  let Tag = as == "link" ? Link : as ?? "button";

  if (href == undefined) href = "";

  return (
    <Tag
      href={href}
      target={target}
      {...rest}
      className={classNames(className, styles.button, {
        [styles.disabled]: disabled,
        [styles.white]: white,
      })}>
      {children}
      {arrow && <Image src={Arrow} alt={""} />}
    </Tag>
  );
}

export default Button;
