import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { image } from "../../api/image";
import { ServicesService } from "../../api/requests";
import Banner from "../../components/blocks/Banner";
import Breadcrumbs from "../../components/blocks/Breadcrumbs";
import Prices from "../../components/blocks/Prices";
import Specialists from "../../components/blocks/Specialists";
import TextBlock from "../../components/blocks/TextBlock";
import { IExpert } from "../../types/expert.type";
import { IService } from "../../types/service.type";

type ServiceListResponseDataItem = IService;
type SpecialistListResponse = IExpert[];

export interface ServiceProps {
  service?: ServiceListResponseDataItem;
  specialists?: SpecialistListResponse;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const services = await ServicesService.getAll();

  return {
    paths: services?.map((e) => ({ params: { slug: e.slug ?? "" } })) ?? [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (c) => {
  const service = await ServicesService.getOneBySlug(c.params?.slug as string);

  return {
    props: {
      service: service ? service : null,
      specialists: service?.specialists,
    },
    notFound: !!!service,
  };
};

function Service({ service, specialists }: ServiceProps) {

  const router = useRouter();

  return (
    <>
      <Breadcrumbs
        path={[
          { href: "/", text: "Главная" },
          { href: "services", text: "Услуги" },
          { href: "1", text: service?.name },
        ]}
      />
      <Banner
        showMoreLink={"#prices"}
        titles={[
          {
            name: service?.name,
            image:
              service?.bannerImage && image(service.bannerImage, "services/"),
            description: service?.bannerText,
            buttonText: "Записаться на консультацию",
            arrow: false,
            onButtonClick: () => router.push("/appointment"),
          },
        ]}
      />
      {service?.prices && <Prices priceList={service.prices} />}
      <TextBlock description={service?.longDescription} />
      <Specialists specialists={specialists} canExpand />
    </>
  );
}

export default Service;
