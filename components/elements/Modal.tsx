import React, {useContext} from "react";
import styles from '../../styles/components/elements/Modal.module.scss'
import {ModalContext} from "../../contexts/ModalContext";
import ModalCross from "./ModalCross";
import {AnimatePresence, motion, Variants} from "framer-motion";

export interface ModalProps {
}

const modalContainerVariants: Variants = {
  show: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  }
}

const modalVariants: Variants = {
  show: {
    y: 0,
  },
  hidden: {
    y: -100,
    transition: {
      bounce: 0
    }
  }
}

function Modal(props: ModalProps) {
  const {window, setWindow} = useContext(ModalContext)

  return <AnimatePresence>
    { window &&
      <motion.div variants={modalContainerVariants} initial={"hidden"} animate={"show"} exit={"hidden"} className={styles.modal}>
        <div className={styles.modal__background_btn} onClick={() => setWindow(null)}/>
        <motion.div variants={modalVariants} className={styles.modal__content}>
          <ModalCross onClick={() => setWindow(null)}/>
          {window}
        </motion.div>
      </motion.div>

    }
  </AnimatePresence>
}

export default Modal;
