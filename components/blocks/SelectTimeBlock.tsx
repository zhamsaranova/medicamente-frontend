import Header from "../elements/Header";
import styles from "../../styles/components/blocks/AppoinmentForm.module.scss";
import TimeLabel from "../elements/TimeLabel";
import { TRecordTime } from "../../types/record-time";

type Props = {
  disabled: boolean;
  times: TRecordTime[];
  selectTime: (time: string) => void;
  selectedTime: string | null;
  takenTimes: string[];
};

const SelectTimeBlock = ({
  times,
  disabled,
  selectTime,
  selectedTime,
  takenTimes,
}: Props) => {
  return (
    <>
      <Header l="h4">Выберите время записи</Header>
      <div className={styles.formRow}>
        <ul className={`${styles.times} ${disabled ? styles.disabled : ""}`}>
          {times.map((item) => (
            <li
              className={`${
                takenTimes.includes(item.time) ? styles.disabled : ""
              }`}
              onClick={() => selectTime(item.time)}
              key={item.id}>
              <TimeLabel active={selectedTime === item.time}>
                {item.time}
              </TimeLabel>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SelectTimeBlock;