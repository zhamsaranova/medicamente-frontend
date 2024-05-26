import { GetStaticProps } from "next/types";
import { SpecializationsService } from "../api/requests";
import AppointmentForm from "../components/blocks/AppointmentForm";
import Breadcrumbs from "../components/blocks/Breadcrumbs";
import Header from "../components/elements/Header";
import PageDescription from "../components/elements/PageDescription";
import Container from "../components/layout/Container";
import { TSpecialization } from "../types/specialization";

function AppointmentPage({
  specializations,
}: {
  specializations: TSpecialization[];
}) {
  return (
    <>
      <Breadcrumbs
        path={[
          { text: "Главная", href: "/" },
          { text: "Онлайн-запись", href: "appointment" },
        ]}
      />
      <Container>
        <Header l="h2">Записаться на приём</Header>
        <PageDescription>
          Вы можете самостоятельно записаться на приём к врачу или диагностику,
          выбрав специалиста, удобную дату и время посещения
        </PageDescription>
        <AppointmentForm specializations={specializations} />
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (c) => {
  const specializations = await SpecializationsService.getAll();

  return {
    props: {
      specializations: specializations ? specializations : null,
    },
    notFound: !specializations,
  };
};
export default AppointmentPage;
