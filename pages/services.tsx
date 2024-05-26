import { GetStaticProps } from "next";
import { ServicesService } from "../api/requests";
import Breadcrumbs from "../components/blocks/Breadcrumbs";
import Services from "../components/blocks/Services";
import { IService } from "../types/service.type";

export interface ServicesPageProps {
  services: IService[];
}

export const getStaticProps: GetStaticProps = async (c) => {
  const services = await ServicesService.getAll();

  return {
    props: {
      services,
    },
  };
};

function ServicesPage({ services }: ServicesPageProps) {
  return (
    <>
      <Breadcrumbs
        path={[
          { href: "/", text: "Главная" },
          { href: "services", text: "Услуги" },
        ]}
      />
      <Services services={services} />
    </>
  );
}

export default ServicesPage;
