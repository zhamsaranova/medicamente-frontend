import {Head, Html, Main, NextScript} from "next/document";
import React from "react";

export interface DocumentProps {

}

function Document(props: DocumentProps) {
    return <Html>
        <Head/>
        <body style={{maxHeight: "100vh", overflow: "hidden"}}>
            <Main/>
            <NextScript/>
        </body>
    </Html>
}

export default Document;
