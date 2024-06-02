import { GetStaticProps } from "next";
import { ExpertsService, ServicesService } from "../api/requests";
import Banner from "../components/blocks/Banner";
import HistoryAndNumbers from "../components/blocks/HistoryAndNumbers";
import Services from "../components/blocks/Services";
import Specialists from "../components/blocks/Specialists";
import { IExpert } from "../types/expert.type";
import { IService } from "../types/service.type";

type ServiceListResponse = IService[];
type SpecialistListResponse = IExpert[];

export interface HomeProps {
  services: ServiceListResponse;
  specialists: SpecialistListResponse;
}

export const getStaticProps: GetStaticProps = async (c) => {
  const services = await ServicesService.getAll();
  const specialists = await ExpertsService.getAll();

  return {
    props: {
      services,
      specialists,
    },
  };
};

const banners = [
  {
    name: "Стоматологические услуги на высшем уровне",
    description: "Рассчитаем план вашего лечения и проведём диагностику",
    image: "/banner1.jpg",
    link: "/appointment",
    buttonText: "Записаться на консультацию",
  },
  {
    name: "Установим художественный винир под ключ",
    description: "Индивидуальное нанесение керамики",
    image: "/banner2.webp",
    link: "/appointment",
    buttonText: "Записаться на консультацию",
  },
];

export default function Home({ services, specialists }: HomeProps) {
  return (
    <>
      <Banner
        showMoreLink={"#services"}
        titles={
          banners.map((e) => ({
            name: e.name,
            description: e.description,
            image: e.image,
            link: e.link,
            buttonText: e.buttonText,
          })) ?? []
        }
      />
      <Services services={services} />
      <HistoryAndNumbers />
      <Specialists specialists={specialists} />
    </>
  );
}
