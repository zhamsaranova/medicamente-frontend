import { ReactNode } from "react";
import styles from "../../styles/components/elements/TimeLabel.module.scss";

const TimeLabel = ({
  children,
  active,
}: {
  children: ReactNode;
  active?: boolean;
}) => {
  return (
    <div className={`${styles.item} ${active ? styles.active : ""}`}>
      {children}
    </div>
  );
};

export default TimeLabel;
