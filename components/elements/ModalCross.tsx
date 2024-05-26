import React from "react";
import styles from '../../styles/components/elements/ModalCross.module.scss'
import Image from "next/image";
import CrossImage from "../../assets/modalCross.svg"

export interface ModalCrossProps {
  onClick: (e : any) => void,
  className?: string
}

function ModalCross(props: ModalCrossProps) {
  let classNames = "";
  if (props.className) classNames=props.className;
  return <>
    <button className={`${styles.modal_close_btn} ${classNames}`} onClick={(e) => props.onClick(e)}><Image src={CrossImage} alt="╳"/></button>
  </>
}

export default ModalCross;
