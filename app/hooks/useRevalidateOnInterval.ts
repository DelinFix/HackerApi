import { useRevalidator } from "@remix-run/react"
import { useEffect } from "react"

interface Options {
    enabled?: boolean
    interval?: number
}

const useRevalidateOnInterval = ({
    enabled = false,
    interval = 1000,
}: Options) => {
    let revalidate = useRevalidator()
    useEffect(() => {
        if (!enabled) return
        let intervalId = setInterval(revalidate.revalidate, interval)
        return () => clearInterval(intervalId)
    }, [enabled, interval, revalidate])
}

export default useRevalidateOnInterval
