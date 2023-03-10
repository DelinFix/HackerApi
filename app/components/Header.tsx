import { Link, useLocation } from "@remix-run/react"
import { useMemo } from "react"
import type { LinksFunction } from "@remix-run/react/dist/routeModules"
import BackIcon from "~/assets/svg/BackIcon"
import styles from "~/styles/components/Header.css"

const Header = () => {
    let location = useLocation()

    const showBackIcon = useMemo(() => location.pathname !== "/", [location])

    return (
        <div className="header">
            {showBackIcon && (
                <Link to="/" className="header-back">
                    <BackIcon width="20px" fill="#fff" />
                    Back
                </Link>
            )}
            <div className="header-title">The Hacker News</div>
        </div>
    )
}

export default Header

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: styles }]
}
