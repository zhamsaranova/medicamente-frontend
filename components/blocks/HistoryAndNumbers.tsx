import { useState } from "react";
import styles from "../../styles/components/blocks/HistoryAndNumbers.module.scss";
import AnimatedNumber from "../elements/AnimatedNumber";
import Highlight from "../elements/Highlight";
import Secondary from "../elements/Secondary";
import Container from "../layout/Container";

const numbers = [
  {
    id: 1,
    number: 25,
    numberPostfix: "+",
    postfix: "лет",
    description: "Оказываем помощь Вашим зубам и деснам",
  },
  {
    id: 2,
    number: 46,
    numberPostfix: "+",
    postfix: "тыс.",
    description: "Оказанных стоматологических услуг",
  },
];

function HistoryAndNumbers() {
  const [inView, setInView] = useState(false);

  return (
    <Container
      id={"history"}
      className={styles.history}
      contentProps={{ onViewportEnter: () => setInView(true) }}>
      <div className={styles.header}>
        <header>
          Наш <Highlight>ключевой принцип</Highlight> — относиться к пациенту
          так, словно лечишь близкого человека
        </header>
      </div>
      <div className={styles.grid}>
        <div className={styles.numbers}>
          {numbers?.map((e, i) => (
            <section key={i}>
              <header>
                <span className={styles.number}>
                  <AnimatedNumber>{inView ? e.number ?? 0 : 0}</AnimatedNumber>
                  {e.numberPostfix}
                </span>{" "}
                {e.postfix}
              </header>
              <summary>{e.description}</summary>
            </section>
          ))}
        </div>
        <Secondary className={styles.description}>
          Мы комплексно подходим к здоровью пациентов. Наша задача не просто
          вылечить зуб, а вылечить болезнь, помочь вам оставаться здоровыми и
          получать удовольствие от жизни.
        </Secondary>
      </div>
    </Container>
  );
}

export default HistoryAndNumbers;
