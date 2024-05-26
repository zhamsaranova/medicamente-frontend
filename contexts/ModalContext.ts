import React, {ReactNode} from "react"

export interface ModalContext {
    window: ReactNode,
    setWindow: (w: React.ReactNode) => void
}

export const ModalContext = React.createContext<ModalContext>({
    window: null,
    setWindow: w => null
})
