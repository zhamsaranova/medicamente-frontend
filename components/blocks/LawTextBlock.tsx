import Header from "../elements/Header";
import Container from "../layout/Container";

export interface LawTextBlockProps {
  header?: string;
  text?: string;
}

function LawTextBlock({ header, text }: LawTextBlockProps) {
  return (
    <Container id={"law"}>
      <Header l={"h2"}>{header}</Header>
      {text}
    </Container>
  );
}

export default LawTextBlock;
