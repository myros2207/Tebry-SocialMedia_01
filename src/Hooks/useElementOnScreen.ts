import {useEffect, useRef, useState} from "react";

const UseElementOnScreen = (options: any) => {
    const containerRef = useRef<any>(null)
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const callbackFunction = (enteries: any) => {
        const [entry] = enteries
        setIsVisible(entry.isIntersecting)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options)

        if(containerRef.current)
            observer.observe(containerRef.current)

        return () => {
            if(containerRef.current)
                observer.unobserve(containerRef.current);
        }
    }, [containerRef, options])

    return [containerRef, isVisible]
};

export default UseElementOnScreen;