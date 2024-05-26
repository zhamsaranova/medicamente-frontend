import React from "react";
import classNames from "classnames";

export interface PageDescriptionProps {
    children?: string,
    className?: string
}

function PageDescription(props: PageDescriptionProps) {
    if(props.children)
        return <p style={{fontSize: 18}} className={classNames(props.className)}>{props.children}</p>
    else return <></>;
}

export default PageDescription;
