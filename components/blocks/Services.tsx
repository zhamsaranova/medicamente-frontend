import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { image } from "../../api/image";
import styles from "../../styles/components/blocks/Services.module.scss";
import { IService } from "../../types/service.type";
import Header from "../elements/Header";
import PageDescription from "../elements/PageDescription";
import Secondary from "../elements/Secondary";
import Container from "../layout/Container";

export interface ServicesProps {
  services?: IService[];
}

function Services({ services }: ServicesProps) {
  return (
    <Container id={"smooth-services"} className={styles.services}>
      <Header l={"h2"}>Услуги</Header>
      <PageDescription className={styles.page_description}></PageDescription>
      <ul className={classNames(styles.list)}>
        {services?.map((e) => (
          <li key={e.id} className={classNames({ [styles.big]: false })}>
            <Link scroll={false} href={"/services/" + e.slug}>
              <Header className={styles.title} l={"h4"} arrow>
                {e.name}
              </Header>
              <Secondary noUpper>{e.shortDescription}</Secondary>
              <figure className={styles.image}>
                {e.icon && (
                  <Image
                    style={{ objectFit: "scale-down", objectPosition: "right" }}
                    fill
                    src={image(e.icon, "services/")}
                    alt={""}
                  />
                )}
              </figure>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Services;
