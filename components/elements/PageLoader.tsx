import styles from "../../styles/components/elements/PageLoader.module.scss";
import Image from "next/image";
import Logo from "../../assets/logoWhite.svg";
import {motion} from "framer-motion";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../pages/_app";

export interface PageLoaderProps {

}

function PageLoader(props: PageLoaderProps) {
    const [playAnimation, setPlayAnimation] = useState(false);
    const [completed, setCompleted] = useState(false)
    const global = useContext(GlobalContext)

    useEffect(() => {
        if (!global.loadingCompleted) {
            const onPageLoad = () => {
                setPlayAnimation(true);
                setTimeout(() => {
                    global.setLoadingCompleted(true);
                }, 800)
            };

            // Check if the page has already loaded
            if (document.readyState === 'complete') {
                onPageLoad();
            } else {
                window.addEventListener('load', onPageLoad);
                // Remove the event listener when component unmounts
                return () => window.removeEventListener('load', onPageLoad);
            }
        }
    }, [global]);

    useEffect(() => {
        if (!global.loadingCompleted) {
            document.body.style.setProperty("max-height", "100vh")
            document.body.style.setProperty("overflow", "hidden")
        } else {
            document.body.style.removeProperty("max-height")
            document.body.style.removeProperty("overflow")
        }
    }, [global.loadingCompleted])

    return <> {!completed && <div className={styles.loader}>
        <div className={styles.container}>
            <motion.div className={styles.logo} animate={playAnimation ? {scale: 1.4, opacity: 0} : undefined} transition={{ease: "easeInOut", duration: 1}}>
                <Image src={Logo} alt={"Medicamente"} priority/>
            </motion.div>
            <motion.div className={styles.background} animate={playAnimation ? {y: "100%"} : undefined} transition={{ease: "easeInOut", duration: 1, delay: 0.8}} onAnimationComplete={() => setCompleted(true)}></motion.div>
        </div>
    </div>
    }</>
}

export default PageLoader;
