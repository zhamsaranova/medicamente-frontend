import styles from "../../styles/components/blocks/SpecialistBlock.module.scss";
import { IExpert } from "../../types/expert.type";
import SpecialistBigCard from "../elements/SpecialistBigCard";
import Container from "../layout/Container";

export interface SpecialistBlockProps {
  specialist?: IExpert;
}

function SpecialistBlock({ specialist }: SpecialistBlockProps) {
  return (
    <Container
      id={"specialist"}
      contentProps={{ className: styles.specialistBlock }}>
      <SpecialistBigCard specialist={specialist} />
    </Container>
  );
}

export default SpecialistBlock;
