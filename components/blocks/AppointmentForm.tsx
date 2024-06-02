import axios from "axios";
import { ru } from "date-fns/locale/ru";
import { FormEvent, useContext, useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { AppointmentService, RecordTimeService } from "../../api/requests";
import { ModalContext } from "../../contexts/ModalContext";
import styles from "../../styles/components/blocks/AppoinmentForm.module.scss";
import { IExpert } from "../../types/expert.type";
import { TRecordTime } from "../../types/record-time";
import { TSpecialization } from "../../types/specialization";
import Button from "../elements/Button";
import Header from "../elements/Header";
import Input from "../elements/Input";
import ModalSuccessAppointment from "../elements/ModalSuccessAppointment";
import Select, { TOption } from "../elements/Select";
import TimeLabel from "../elements/TimeLabel";
import SelectTimeBlock from "./SelectTimeBlock";

export type TCreateAppointment = {
  fullname: string;
  birthDate: string;
  phone: string;
  email: string;
  date: string;
  expertId: string;
};

const AppointmentForm = ({
  specializations,
}: {
  specializations: TSpecialization[];
}) => {
  const { setWindow } = useContext(ModalContext);

  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    phone: "",
    email: "",
  });

  const [error, setError] = useState("");

  const [selected, setSelected] = useState<Date>();
  const [selectedExpert, setSelectedExpert] = useState<TOption | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<TOption | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [recordTimes, setRecordTimes] = useState<TRecordTime[]>([]);

  const [alreadySelectedTimes, setAlreadySelectedTimes] = useState<string[]>(
    [],
  );

  const [isCorrectDate, setIsCorrectDate] = useState(false);

  const [activeSpecialization, setActiveSpecialization] =
    useState<TSpecialization | null>(null);
  const [activeExpert, setActiveExpert] = useState<IExpert | null>(null);

  useEffect(() => {
    if (selectedSpecialization) {
      const item = specializations.find(
        (item) => item.id === selectedSpecialization.value,
      );
      item && setActiveSpecialization(item);
    }
  }, [selectedSpecialization]);

  useEffect(() => {
    if (selectedExpert) {
      const item = activeSpecialization?.experts.find(
        (item) => item.id === selectedExpert.value,
      );
      item && setActiveExpert(item);
    }
  }, [selectedExpert]);

  useEffect(() => {
    const fetchTimes = async () => {
      const response = await RecordTimeService.getAll();
      response && setRecordTimes(response);
    };

    fetchTimes();
  }, []);

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.birthDate ||
      !formData.email ||
      !formData.fullName ||
      !formData.phone ||
      !selected ||
      !selectedTime ||
      !selectedExpert ||
      !selectedExpert
    ) {
      setError("Необходимо заполнить все поля");
      return;
    } else {
      setError("");
    }

    const appointmentDate = selected;
    appointmentDate?.setHours(
      Number(selectedTime?.split(":")[0]),
      Number(selectedTime?.split(":")[1]),
    );

    if (
      appointmentDate &&
      selectedExpert &&
      activeSpecialization &&
      selectedTime
    ) {
      const body: TCreateAppointment = {
        fullname: formData.fullName,
        birthDate: formData.birthDate,
        date: appointmentDate.toISOString(),
        phone: formData.phone,
        email: formData.email,
        expertId: selectedExpert.value.toString(),
      };

      try {
        const response = await AppointmentService.create(body);

        setWindow(
          <ModalSuccessAppointment
            data={{
              fullname: formData.fullName,
              date: new Date(selected).toLocaleDateString(),
              specialization: activeSpecialization.name,
              expert: `${activeExpert?.lastName} ${activeExpert?.firstName} ${activeExpert?.middleName}`,
              time: selectedTime,
            }}
          />,
        );
        setActiveExpert(null);
        setActiveSpecialization(null);
        setSelected(undefined);
        setFormData({ fullName: "", birthDate: "", phone: "", email: "" });
        setSelectedExpert(null);
        setSelectedSpecialization(null);
        setSelectedTime(null);
        console.log(response);
      } catch (e) {
        console.log(e);
        if (axios.isAxiosError(e)) {
          setError(e.response?.data.message);
        } else {
          setError('Произошла ошибка')
        }
      }
    }
  };

  useEffect(() => {
    if (selected) {
      if (
        activeExpert?.recordDates.some(
          (item) => new Date(item).getTime() === new Date(selected).getTime(),
        )
      ) {
        setIsCorrectDate(true);

        const filteredDates = activeExpert.appointments.filter(
          (item) =>
            new Date(new Date(item.date).setHours(0, 0)).getTime() ===
            new Date(new Date(selected).setHours(0, 0)).getTime(),
        );

        setAlreadySelectedTimes(
          filteredDates.map(
            (item) =>
              `${("0" + new Date(item.date).getHours()).slice(-2)}:${(
                "0" + new Date(item.date).getMinutes()
              ).slice(-2)}`,
          ),
        );
      } else {
        setAlreadySelectedTimes([]);
        setIsCorrectDate(false);
        setSelectedTime(null);
      }
    }
  }, [selected]);

  return (
    <div className={styles.container}>
      <form onSubmit={formSubmit}>
        <Header l="h4">Введите личные данные</Header>
        <div className={styles.formRow}>
          <Input
            white={false}
            mask={""}
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            containerProps={{ className: styles.input }}
            label={"ФИО"}
          />
          <Input
            white={false}
            mask={"99.99.9999"}
            value={formData.birthDate}
            onChange={(e) =>
              setFormData({ ...formData, birthDate: e.target.value })
            }
            containerProps={{ className: styles.input }}
            label={"Дата рождения*"}
          />
          <Input
            white={false}
            mask={"+7 999 999 99 99"}
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            containerProps={{ className: styles.input }}
            label={"Телефон"}
          />
          <Input
            white={false}
            mask={""}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            containerProps={{ className: styles.input }}
            label={"E-mail*"}
          />
        </div>

        <Header l="h4">Выберите специалиста</Header>
        <div className={styles.formRow}>
          <Select
            placeholder="Выберите направление"
            options={specializations.map((item) => {
              return {
                value: item.id,
                name: item.name,
              };
            })}
            selected={selectedSpecialization}
            onChange={(value) => setSelectedSpecialization(value)}
          />

          <Select
            className={!activeSpecialization ? styles.disabled : ""}
            placeholder="Выберите специалиста"
            options={
              activeSpecialization
                ? activeSpecialization.experts.map((item) => {
                    return {
                      value: item.id,
                      name: `${item.firstName} ${item.middleName} ${item.lastName}`,
                    };
                  })
                : []
            }
            selected={selectedExpert}
            onChange={(value) => setSelectedExpert(value)}
          />
        </div>
        <Header l="h4">Выберите дату записи</Header>
        <div className={styles.formRow}>
          <div
            className={`${styles.calendarBody} ${
              !activeExpert ? styles.disabled : ""
            }`}>
            <DayPicker
              styles={{
                root: {
                  width: "100%",
                },
                months: {
                  width: "100%",
                },
                month: {
                  padding: "24px 16px 16px",
                  borderRadius: "16px",
                  boxShadow: "0 0 20px 0 rgba(0,0,0,0.1)",
                },
                day: {
                  width: "51px",
                  borderRadius: "4px",
                },
              }}
              locale={ru}
              mode="single"
              modifiers={{
                available: activeExpert
                  ? activeExpert.recordDates.map((item) => new Date(item))
                  : [],
              }}
              modifiersClassNames={{
                available: styles.available,
                selected: styles.selected,
              }}
              numberOfMonths={3}
              selected={selected}
              onSelect={setSelected}
            />
            <footer className={styles.datePickerFooter}>
              <div className={styles.annotationItem}>
                <div className={`${styles.dayBadge}`}>1</div>– свободная дата
              </div>
              <div className={styles.annotationItem}>
                <div className={`${styles.dayBadge} ${styles.selected}`}>1</div>
                – выбранная дата
              </div>
            </footer>
          </div>
        </div>

        <SelectTimeBlock
          disabled={!isCorrectDate}
          times={recordTimes}
          takenTimes={alreadySelectedTimes}
          selectTime={(time) => setSelectedTime(time)}
          selectedTime={selectedTime}
        />

        {error && <small className={styles.error}>{error}</small>}
        <Button className={styles.button}>Записаться на приём</Button>
      </form>
    </div>
  );
};

export default AppointmentForm;
