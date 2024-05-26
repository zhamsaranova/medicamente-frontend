import { GetStaticPaths, GetStaticProps } from "next";
import { ExpertsService } from "../../api/requests";
import Breadcrumbs from "../../components/blocks/Breadcrumbs";
import SpecialistBlock from "../../components/blocks/SpecialistBlock";
import { IExpert } from "../../types/expert.type";

export interface SpecialistPageProps {
  specialist?: IExpert;
}

export const getStaticProps: GetStaticProps = async (c) => {
  const specialist = await ExpertsService.getOneBySlug(
    c.params?.slug as string,
  );

  return {
    props: {
      specialist: specialist,
    },
    notFound: !!!specialist,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const specialists = await ExpertsService.getAll();

  return {
    paths: specialists?.map((e) => ({ params: { slug: e.slug ?? "" } })) ?? [],
    fallback: "blocking",
  };
};

function SpecialistPage({ specialist }: SpecialistPageProps) {
  return (
    <>
      <Breadcrumbs
        path={[
          { href: "/", text: "Главная" },
          { text: "Наши специалисты", clickable: false },
          {
            href: "specialists/" + specialist?.slug,
            text: `${specialist?.lastName} ${specialist?.firstName} ${specialist?.middleName}`,
          },
        ]}
      />
      <SpecialistBlock specialist={specialist} />
    </>
  );
}

export default SpecialistPage;
