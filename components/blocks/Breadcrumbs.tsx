import Link from "next/link";
import styles from "../../styles/components/blocks/Breadcrumbs.module.scss";
import Container from "../layout/Container";
import classNames from "classnames";

export interface PathEntry {
    text?: string,
    href?: string,
    clickable?: boolean
}

export interface BreadcrumbsProps {
    path: PathEntry[]
}

function Breadcrumbs(props: BreadcrumbsProps) {
    return <Container id={"breadcrumbs"} className={classNames(styles.breadcrumbs, "noPaddingAfter")} contentProps={{className: styles.content}}>
        {props.path.map((e, i) =>
            (e.clickable ?? true)
                ? <Link scroll={false} className={classNames(styles.part, {[styles.active]: i == props.path.length - 1})} key={i} href={
                !e.href
                    ? "#"
                    : e.href.startsWith("/") ? e.href : props.path.slice(0, i + 1).map(e => e.href).join("")
            }>
                {e.text}{i != props.path.length - 1 && " - "}
            </Link> : <span className={classNames(styles.part, {[styles.active]: i == props.path.length - 1})} key={i}>
                {e.text}{i != props.path.length - 1 && " - "}
            </span>
        )}
    </Container>
}

export default Breadcrumbs;
