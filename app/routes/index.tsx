import { useLoaderData, useRevalidator } from "@remix-run/react"
import type { LinksFunction } from "@remix-run/react/dist/routeModules"
import Loader from "~/components/Loader"
import Post from "~/components/Post"
import { useState, useEffect } from "react"
import useRevalidateOnInterval from "~/hooks/useRevalidateOnInterval"
import styles from "~/styles/index.css"
import type { IPost } from "~/types/Post"
import { fetchPosts } from "~/utils/fetchPosts"
import { links as HeaderLinks } from "~/components/Header"
import { links as LoaderLinks } from "~/components/Loader"

export async function loader() {
    return fetchPosts({ limit: "100" })
}

const Home = () => {
    const posts: IPost[] = useLoaderData<typeof loader>()
    const revalidator = useRevalidator()
    const [hydrated, setHydrated] = useState(false)

    useRevalidateOnInterval({ enabled: true, interval: 60000 })

    useEffect(() => {
        setHydrated(true)
    }, [])

    if (!hydrated) {
        return null
    }

    const updateNews = () => {
        revalidator.revalidate()
    }

    return (
        <div className="wrapper">
            <Loader show={revalidator.state !== "idle"} />
            <button className="update--btn" onClick={updateNews}>
                Update news
            </button>
            {posts.map((post) => (
                <Post {...post} key={post?.id} />
            ))}
        </div>
    )
}

export default Home

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
    ...HeaderLinks(),
    ...LoaderLinks(),
]
