import Breadcrumbs from "../components/blocks/Breadcrumbs";
import LawTextBlock from "../components/blocks/LawTextBlock";

function LegalInfo() {
  return (
    <>
      <Breadcrumbs
        path={[
          { text: "Главная", href: "/" },
          { text: "Юридическая информация", href: "legal" },
        ]}
      />
      <LawTextBlock header={"Юридическая информация"} text={""} />
    </>
  );
}

export default LegalInfo;
