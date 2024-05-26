import Image from "next/image";
import Link from "next/link";
import Phone from "../../assets/78bb79f1d169c1fe67e9737cd6fb2791.png";
import Mail from "../../assets/a462f29bf748ce22827692acc1aef880.png";
import Logo from "../../assets/logoWhite.svg";
import styles from "../../styles/components/blocks/Footer.module.scss";
import Container from "../layout/Container";

function Footer() {
  return (
    <Container
      opacity
      as={"footer"}
      className={styles.footer}
      contentProps={{ className: styles.content }}>
      <div className={styles.firstRow}>
        <Image src={Logo} alt={"Medicamente"} />
        <div className={styles.links}>
          {[
            { name: "Услуги и цены", path: "/services" },
            { name: "Контакты", path: "/contacts" },
          ].map((e, i) => (
            <Link scroll={false} key={i} href={e.path}>
              {e.name}
            </Link>
          ))}
        </div>
        <div className={styles.socials}>
          {[
            {
              icon: Mail,
              alt: "Почта",
              href: "mailto:medicamente23@mail.ru",
              size: 20,
            },
            {
              icon: Phone,
              alt: "Телефон",
              href: "tel:+7(861)206-91-07",
              size: 16,
            },
          ].map((e, i) => (
            <a key={i} href={e.href}>
              <Image width={e.size} height={e.size} src={e.icon} alt={e.alt} />
            </a>
          ))}
        </div>
      </div>
      <hr />
      <div className={styles.secondRow}>
        <header>© 2024 Medica Mente</header>
      </div>
      <div className={styles.thirdRow}>
        <div className={styles.links}>
          {[
            { name: "Политика конфиденциальности", path: "/privacy" },
            { name: "Юридическая информация", path: "/legal" },
          ].map((e, i) => (
            <Link scroll={false} key={i} href={e.path}>
              {e.name}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Footer;
