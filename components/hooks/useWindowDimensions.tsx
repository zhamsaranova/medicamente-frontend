import {useEffect, useState} from 'react';

function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState<{width?: number, height?: number}>({width: undefined, height: undefined});

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        handleResize()

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
