import Button from "./Button";
import Header from "./Header";
import Secondary from "./Secondary";
import styles from "../../styles/components/elements/ModalSuccessAppointment.module.scss";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { TCreateAppointment } from "../blocks/AppointmentForm";

type Props = {
  data: {
    time: string;
    date: string;
    expert: string;
    specialization: string;
    fullname: string;
  };
};

const ModalSuccessAppointment = ({ data }: Props) => {
  const { setWindow } = useContext(ModalContext);

  return (
    <div className={styles.container}>
      <Header l="h4">Вы записаны на приём</Header>

      <div className={styles.body}>
        <div className={styles.row}>
          <span>Пациент</span>
          <strong>{data.fullname}</strong>
        </div>
        <div className={styles.row}>
          <span>Cпециалист</span>
          <strong>{data.expert}</strong>
        </div>
        <div className={styles.row}>
          <span>Направление</span>
          <strong>{data.specialization}</strong>
        </div>
        <div className={styles.row}>
          <span>Дата</span>
          <strong>{data.date}</strong>
        </div>
        <div className={styles.row}>
          <span>Время</span>
          <strong>{data.time}</strong>
        </div>
      </div>
      <Button
        onClick={() => setWindow(null)}
        className={styles.button}
        as="link"
        href="/">
        Перейти На главную
      </Button>
    </div>
  );
};

export default ModalSuccessAppointment;
