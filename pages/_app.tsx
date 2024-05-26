import "locomotive-scroll/dist/locomotive-scroll.min.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import "react-before-after-slider-component/dist/build.css";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import "../assets/font/lato.css";
import Footer from "../components/blocks/Footer";
import Navbar from "../components/blocks/Navbar";
import AnimationLayout from "../components/elements/AnimationLayout";
import CustomCursor from "../components/elements/CustomCursor";
import LocomotiveScrollRouter from "../components/elements/LocomotiveScrollRouter";
import Modal from "../components/elements/Modal";
import PageLoader from "../components/elements/PageLoader";
import { ModalContext } from "../contexts/ModalContext";
import styles from "../styles/App.module.scss";
import "../styles/globals.scss";

const savePageStyles = () => {
  const head = document.head;
  const previousStylesFixes = head.querySelectorAll("[data-pt-fix]");

  // Delete previously created fixes
  if (previousStylesFixes) {
    for (let i = 0; i < previousStylesFixes.length; i++) {
      head.removeChild(previousStylesFixes[i]);
    }
  }

  // Get all the styles of the page
  const allStyleElems: NodeListOf<HTMLLinkElement> = head.querySelectorAll(
    'link[rel="stylesheet"], link[as="style"]',
  );
  // Get all the inline styles of the page, labelled by "data-n-href" ( defined by nextjs )
  const allInlineStylesElems: NodeListOf<HTMLStyleElement> =
    head.querySelectorAll("style[data-n-href]");

  // Create doubling links to css sheets that wont be removed unless we say so
  if (allStyleElems) {
    for (let i = 0; i < allStyleElems.length; i++) {
      if (allStyleElems[i].href) {
        const styles = document.createElement("link");
        styles.setAttribute("data-pt-fix", "true");
        styles.setAttribute("rel", "stylesheet");
        styles.setAttribute("href", allStyleElems[i].href);

        head.appendChild(styles);
      }
    }
  }

  // Now do the same with the inline styles
  const inlineStyles = document.createElement("style");
  inlineStyles.setAttribute("data-pt-fix", "true");
  if (allInlineStylesElems) {
    for (let i = 0; i < allInlineStylesElems.length; i++) {
      inlineStyles.innerHTML += allInlineStylesElems[i].innerHTML;
    }

    head.appendChild(inlineStyles);
  }
};

export type GlobalProps = {
  // common?: CommonResponse;
  loadingCompleted: boolean;
  setLoadingCompleted: React.Dispatch<boolean>;
};
export const GlobalContext = React.createContext<GlobalProps>({
  loadingCompleted: false,
  setLoadingCompleted: () => {},
});

export default function App({ Component, pageProps, router }: AppProps) {
  const [modalWindow, setModalWindow] = useState<ReactNode>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleDone = () => {
      // Arbitrary setTimeout, modify it at will
      setTimeout(() => {
        savePageStyles();
      }, 1000);
    };

    router.events.on("routeChangeComplete", handleDone);

    return () => {
      router.events.off("routeChangeComplete", handleDone);
    };
  }, [router]);

  // Trigger the onMount function on the first page load so that your first page is also "fixed"
  // Note : I let you decide how this function is triggered because this depends a lot per stack
  const onMount = () => {
    savePageStyles();
  };
  useEffect(onMount, []);

  const [global, setGlobal] = useState<GlobalProps>({
    // common: (pageProps as any).common,
    loadingCompleted: false,
    setLoadingCompleted: (state: boolean) => {
      setGlobal((prevState) => ({ ...prevState, loadingCompleted: state }));
    },
  });

  return (
    <GlobalContext.Provider value={global}>
      <Head>
        <title>Medicamente</title>
        <link rel={"icon"} href={"favicon.svg"} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <ModalContext.Provider
        value={{
          window: modalWindow,
          setWindow: (w: ReactNode) => setModalWindow(w),
        }}>
        <Navbar />
        <LocomotiveScrollProvider
          containerRef={containerRef}
          watch={[]}
          options={{ smooth: true }}>
          <LocomotiveScrollRouter>
            <React.StrictMode>
              <main
                data-scroll-container={""}
                style={{ perspective: "1px" }}
                ref={containerRef}
                className={styles.main}>
                <AnimationLayout>
                  <div className={styles.content}>
                    <Component {...pageProps} />
                  </div>
                </AnimationLayout>
                <Footer />
              </main>
              <PageLoader />
              <CustomCursor enabled={global.loadingCompleted} />
            </React.StrictMode>
          </LocomotiveScrollRouter>
          <Modal />
        </LocomotiveScrollProvider>
      </ModalContext.Provider>
    </GlobalContext.Provider>
  );
}
