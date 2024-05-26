import styles from "../../styles/components/blocks/Contacts.module.scss";
import Contact from "../elements/Contact";
import Header from "../elements/Header";
import Highlight from "../elements/Highlight";
import Container from "../layout/Container";

const workTime = [
  {
    id: 1,
    fromDay: "пн",
    toDay: "пт",
    fromTime: "08:00",
    toTime: "20:00",
  },
  {
    id: 2,
    fromDay: "сб",
    toDay: "вс",
    fromTime: "09:00",
    toTime: "16:00",
  },
];

function Contacts() {
  return (
    <>
      <Container id={"contacts"} className={styles.contacts}>
        <Header l={"h2"}>Контакты</Header>
        <ul className={styles.list}>
          <li className={styles.item}>
            <header>Адрес</header>
            <summary className={styles.address}>
              г. Краснодар, ул. им. Гагарина 108 / пр. Луговой 50
            </summary>
          </li>
          <li className={styles.item}>
            <header>Время работы</header>
            {workTime.map((e, i) => (
              <summary key={i} className={styles.row}>
                <Highlight className={styles.highlight}>
                  {e.fromDay}-{e.toDay}
                </Highlight>{" "}
                {e.fromTime} до {e.toTime}
              </summary>
            ))}
          </li>
          <li className={styles.item}>
            <header>Телефон и e-mail</header>
            <summary className={styles.row}>
              <Contact>+7(861)206-91-07</Contact>
            </summary>
            <summary className={styles.row}>
              <Contact>medicamente23@mail.ru</Contact>
            </summary>
          </li>
        </ul>
      </Container>
      <section id={"map"} data-scroll-section={""}>
        <div className={styles.map}>
          <iframe
            src={
              "https://maps.google.com/maps?q=%D0%B3.%20%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80,%20%D1%83%D0%BB.%20%D0%B8%D0%BC.%20%D0%93%D0%B0%D0%B3%D0%B0%D1%80%D0%B8%D0%BD%D0%B0%20108&t=&z=13&ie=UTF8&iwloc=&output=embed"
            }
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}

export default Contacts;
