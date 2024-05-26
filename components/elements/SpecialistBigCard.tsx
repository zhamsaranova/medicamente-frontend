import Image from "next/image";
import { image } from "../../api/image";
import backgroundImage from "../../assets/specialistBackgrorundBlack.svg";
import styles from "../../styles/components/elements/SpecialistBigCard.module.scss";
import { IExpert } from "../../types/expert.type";
import Button from "./Button";
import Header from "./Header";

type SpecialistListResponseDataItem = IExpert;

export interface SpecialistBigCardProps {
  specialist?: SpecialistListResponseDataItem;
}

function SpecialistBigCard({ specialist }: SpecialistBigCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.backgroundImage}>
        <Image src={backgroundImage} alt="" />
      </div>
      <div className={styles.photo}>
        {specialist?.photo && (
          <Image
            draggable={false}
            style={{ objectFit: "contain", objectPosition: "bottom" }}
            src={image(specialist.photo, "experts/")}
            fill
            alt={"Фото"}
          />
        )}
      </div>
      <div className={styles.description}>
        <Header className={styles.header} l={"h2"}>{`${
          specialist?.lastName ?? ""
        } ${specialist?.firstName ?? ""} ${
          specialist?.middleName ?? ""
        }`}</Header>
        <div className={styles.tags}>
          {specialist?.tags?.map((e, i) => (
            <div key={i} className={styles.tag}>
              <span>{e}</span>
            </div>
          ))}
        </div>
        {specialist?.experienceInYears && (
          <div className={styles.info}>
            <header>Стаж работы</header>
            <summary>{specialist.experienceInYears} лет</summary>
          </div>
        )}
        {(specialist?.specializations?.length ?? 0) > 0 && (
          <div className={styles.info}>
            <header>Специализация</header>
            <summary>
              {specialist?.specializations?.map((e) => e.name).join(", ")}
            </summary>
          </div>
        )}
        <footer className={styles.footer}>
          <Button className={styles.button} as={"link"} href={"/appointment"}>
            Записаться на приём
          </Button>
        </footer>
      </div>
    </div>
  );
}

export default SpecialistBigCard;
