import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {useLocomotiveScroll} from "react-locomotive-scroll";

export interface LocomotiveScrollRouterProps {
    children: React.ReactNode
}

function LocomotiveScrollRouter(props: LocomotiveScrollRouterProps) {
    const router = useRouter()
    const scroll = useLocomotiveScroll()
    const [init, setInit] = useState(false)

    useEffect(() => {
        if (!init && scroll.scroll && router.asPath.includes("#")) {
            setInit(true)
            scroll.scroll.scrollTo("#smooth-" + router.asPath.split("#")[1], {offset: -50})
        }
    }, [scroll, router.asPath, init])

    useEffect(() => {
        const onNextJSHashChange = (url: string) => {
            const id = "smooth-" + (url.split("#").length > 1 ? url.split("#")[1] : "")
            if (url.split("#")[1] == "nav") return;

            if (document.documentElement.classList.contains("has-scroll-smooth")) {
                scroll.scroll.scrollTo("#" + id, {offset: -50})
            } else {
                const element = document.getElementById(id);
                element?.scrollIntoView({behavior: "auto", block: "end", inline: "nearest"});
            }
            scroll.scroll.start()
        }

        router.events.on('hashChangeStart', onNextJSHashChange)
        return () => {
            router.events.off('hashChangeStart', onNextJSHashChange)
        }
    }, [router.asPath, router.events, scroll])

    return <>{props.children}</>
}

export default LocomotiveScrollRouter;
