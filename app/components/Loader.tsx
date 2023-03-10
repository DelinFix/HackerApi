import type { LinksFunction } from "@remix-run/react/dist/routeModules"
import type { FC } from "react"
import styles from "~/styles/components/Loader.css"

interface ILoaderProps {
    show: boolean
}

const Loader: FC<ILoaderProps> = (props) => {
    const { show } = props

    return (
        <div hidden={!show}>
            <div className="loader-overlay" />
            <svg
                className="loader"
                width="200px"
                height="200px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M16 8.00023L18.3642 5.63609M5.63631 18.364L8.00026 16M17.6566 12H21M3 12H6.34315M12 6.34342L12 3M12 21L12 17.6569M8.00023 8.00023L5.63609 5.63609M18.364 18.364L16 16"
                    stroke="#363853"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    )
}

export default Loader

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: styles }]
}
