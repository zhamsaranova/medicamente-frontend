import classNames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { image } from "../../api/image";
import backgroundImage from "../../assets/specialistBackgrorund.svg";
import styles from "../../styles/components/elements/SpecialistCard.module.scss";
import { IExpert } from "../../types/expert.type";
import Arrow from "./Arrow";

export interface SpecialistCardProps {
  info?: IExpert;
  slug?: string;
  smallSlug?: string;
  size?: "small" | "big";
  expand?: boolean;
  onClick?: () => void;
  ignoreClick?: boolean;
  highLightText?: string;
  canExpand?: boolean;
}

const OptionalLink = ({
  href,
  children,
  ...rest
}: HTMLAttributes<HTMLElement> & { href?: string }) => {
  if (href) {
    return (
      <Link scroll={false} href={href} {...rest}>
        {children}
      </Link>
    );
  } else {
    return <div {...rest}>{children}</div>;
  }
};

function SpecialistCard({
  info,
  expand,
  size,
  slug,
  smallSlug,
  onClick,
  ignoreClick,
  highLightText,
  canExpand,
}: SpecialistCardProps) {
  return (
    <OptionalLink
      draggable={false}
      onClick={onClick}
      href={smallSlug ? `/specialists/${smallSlug}` : undefined}
      style={{ pointerEvents: ignoreClick ? "none" : "auto" }}
      className={classNames(
        styles.card,
        { [styles.expand]: expand, [styles.canExpand]: canExpand },
        styles[size ?? "small"],
      )}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
        className={styles.imageContainer}>
        <div className={styles.backgroundImage}>
          <Image src={backgroundImage} alt="" fill />
        </div>
        <div className={styles.image}>
          {info?.photo && (
            <Image
              draggable={false}
              style={{ objectFit: "contain", objectPosition: "bottom" }}
              src={image(info?.photo, "experts/")}
              fill
              alt={"Фото"}
            />
          )}
        </div>
      </motion.div>
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout={"position"}
        transition={{ bounce: 0 }}>
        <header>
          {`${info?.lastName ?? ""} ${info?.firstName ?? ""} ${
            info?.middleName ?? ""
          }`}
        </header>
        <summary>
          {info?.tags?.map((e, i) => (
            <div key={i} className={styles.tag}>
              {e}
            </div>
          ))}
        </summary>
        {expand && (
          <>
            <div className={styles.table}>
              {info?.experienceInYears && (
                <>
                  <header>Стаж</header>
                  <summary>{info.experienceInYears} лет</summary>
                </>
              )}
              {(info?.specializations?.length ?? 0) > 0 && (
                <>
                  <header>Специализация</header>
                  <summary>
                    {info?.specializations?.map((e) => e).join(", ")}
                  </summary>
                </>
              )}
            </div>
            {size == "small" && (
              <span className={styles.link}>
                Подробнее <Arrow />
              </span>
            )}
          </>
        )}
      </motion.article>
    </OptionalLink>
  );
}

export default SpecialistCard;
