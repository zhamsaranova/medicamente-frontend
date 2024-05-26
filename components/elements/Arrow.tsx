export interface ArrowProps {

}

function Arrow(props: ArrowProps) {
    return  <svg width="26" height="10" viewBox="0 0 26 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 5L25 5" stroke="#626aed" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 9L25 5" stroke="#626aed" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 1L25 5" stroke="#626aed" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
}

export default Arrow;
