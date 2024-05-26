import { MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";

export type TOption = {
  value: number;
  name: string;
};

type Props = {
  options: TOption[];
  selected: TOption | null;
  onChange: (selected: TOption) => void;
  placeholder: string;
  className?: string;
};

const Select = ({
  options,
  selected,
  onChange,
  placeholder,
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !containerRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    // @ts-ignore
    window.addEventListener("click", handleClick);

    return () => {
      // @ts-ignore
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className} ${
        isOpen ? styles.open : ""
      }`}>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.active}>
        {selected ? selected.name : placeholder}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 9L12 16L5 9"
            stroke="#ACADAD"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={`${styles.body}`}>
        {options.map((item) => (
          <div
            key={item.value}
            onClick={() => {
              onChange(item);
              setIsOpen(false);
            }}
            className={`${styles.option} ${
              item.value === selected?.value ? styles.selected : ""
            }`}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
