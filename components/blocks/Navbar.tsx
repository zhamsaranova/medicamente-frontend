import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/logo.svg";
import { GlobalContext } from "../../pages/_app";
import styles from "../../styles/components/elements/Navbar.module.scss";
import Button from "../elements/Button";
import Contact from "../elements/Contact";
import { Toggle } from "../elements/Toggle";
import Container from "../layout/Container";

const mobileNavVariants: Variants = {
  show: {
    opacity: 1,
    transition: {
      bounce: 0,
      staggerChildren: 0.05,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      delay: 0.2,
      bounce: 0,
      staggerChildren: 0.05,
    },
  },
};

const mobileNavItemVariants: Variants = {
  show: {
    y: 0,
    opacity: 1,
  },
  hidden: {
    y: 20,
    opacity: 0,
  },
};

const MotionLink = motion(Link);

function Navbar() {
  const { asPath, push } = useRouter();
  const hash = asPath.split("#")[1] || "";
  const global = useContext(GlobalContext);
  const router = useRouter();
  const [init, setInit] = useState(false);

  const show = hash == "nav" && init;
  useEffect(() => {
    setInit(true);
  }, []);

  const setShow = (s: boolean) => {
    push({ hash: s ? "nav" : "#" }, undefined, { scroll: false });
  };

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY != 0) setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onChange = () => {
      window.scrollTo(0, scrollY);
    };

    router.events.on("hashChangeComplete", onChange);
    return () => router.events.off("hashChangeComplete", onChange);
  }, [router, scrollY]);

  const onMenuClick = () => {
    setShow(!show);
  };

  return (
    <Container
      opacity
      observerMargin={"0px"}
      as={"nav"}
      className={styles.navbar}
      contentProps={{ className: styles.content }}>
      <Link scroll={false} className={styles.logo} href={"/"}>
        <Image src={Logo} alt={"Medicamente"} />
      </Link>
      <div className={styles.links}>
        <>
          {[
            { name: "Главная", path: "/" },
            { name: "Услуги и цены", path: "/services" },
            { name: "Контакты", path: "/contacts" },
          ].map((e, i) => (
            <Link scroll={false} key={i} href={e.path}>
              {e.name}
              <AnimatePresence>
                {e.path == asPath.split("#")[0].split("?")[0] && (
                  <motion.div
                    key={i + "d"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layoutId={"underline"}
                    className={styles.active}
                  />
                )}
              </AnimatePresence>
            </Link>
          ))}
        </>
      </div>
      <div className={styles.contact}>
        <Contact className={styles.phone}>+7 (861) 206-91-07</Contact>

        <Button as="link" href="/appointment" className={styles.button}>
          Онлайн-запись
        </Button>
      </div>
      <div className={styles.toggle}>
        <Toggle toggle={onMenuClick} toggled={show} />
      </div>
      <AnimatePresence mode={"wait"}>
        {show && (
          <motion.div
            key={"menu"}
            variants={mobileNavVariants}
            initial={"hidden"}
            animate={"show"}
            exit={"hidden"}
            className={styles.mobileMenu}>
            {[
              { name: "Главная", path: "/" },
              { name: "Услуги и цены", path: "/services" },
              { name: "Контакты", path: "/contacts" },
            ].map((e, i) => (
              <MotionLink
                variants={mobileNavItemVariants}
                key={i}
                href={e.path}
                className={styles.link}
                onClick={() => setShow(!show)}>
                {e.name}
              </MotionLink>
            ))}
            <motion.div variants={mobileNavItemVariants}>
              <Button className={styles.button} as="link" href="/appointment">
                Онлайн-запись
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default Navbar;
