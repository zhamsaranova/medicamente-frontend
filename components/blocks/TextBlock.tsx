import Container from "../layout/Container";
import HtmlRender from "../elements/HtmlRender";
import styles from "../../styles/components/blocks/TextBlock.module.scss"

export interface TextBlockProps {
    description?: string
}

function TextBlock({description}: TextBlockProps) {
    return <Container noTopPadding text id={"smooth-text"} className={styles.textBlock}>
        <HtmlRender preset={"textBlock"}>
            {description}
        </HtmlRender>
    </Container>
}

export default TextBlock;
