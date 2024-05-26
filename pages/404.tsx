import Button from "../components/elements/Button";
import Highlight from "../components/elements/Highlight";
import Container from "../components/layout/Container";
import styles from "../styles/pages/NotFound.module.scss";

function NotFound() {

  return (
    <Container
      className={styles.notFound}
      contentProps={{ className: styles.content }}>
      <header>
        <Highlight>4</Highlight>0<Highlight>4</Highlight>
      </header>
      <summary>
        К сожалению, страница <Highlight>не найдена</Highlight> :(
      </summary>
      <Button arrow as={"link"} href={"/"}>
        Вернуться назад
      </Button>
    </Container>
  );
}

export default NotFound;
