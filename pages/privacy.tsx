import Breadcrumbs from "../components/blocks/Breadcrumbs";
import LawTextBlock from "../components/blocks/LawTextBlock";

const text = "";

function Privacy() {
  return (
    <>
      <Breadcrumbs
        path={[
          { text: "Главная", href: "/" },
          { text: "Политика конфиденциальности", href: "privacy" },
        ]}
      />
      <LawTextBlock header={"Политика конфиденциальности"} text={text} />
    </>
  );
}

export default Privacy;
