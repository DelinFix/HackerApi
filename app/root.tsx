import type { MetaFunction } from "@remix-run/node"
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react"
import Header from "./components/Header"

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "The Hacker News",
    viewport: "width=device-width,initial-scale=1",
})

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <header>
                    <Header />
                </header>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
