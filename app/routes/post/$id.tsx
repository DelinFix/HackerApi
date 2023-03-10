import { useLoaderData } from "@remix-run/react"
import Comments from "~/components/Comments"
import timeago from "~/utils/timeValidation"
import styles from "~/styles/post/$id.css"
import { fetchPost } from "~/utils/fetchPost"
import { links as HeaderLinks } from "~/components/Header"
import { links as LoaderLinks } from "~/components/Loader"
import { links as CommentsLinks } from "~/components/Comments"
import type { LinksFunction } from "@remix-run/react/dist/routeModules"
import useRevalidateOnInterval from "~/hooks/useRevalidateOnInterval"

interface PageParams {
    params: {
        id: string
    }
}

export async function loader({ params }: PageParams) {
    return fetchPost(params)
}

const PostPage = () => {
    const { post, comments } = useLoaderData<typeof loader>()
    const { time, title, url, by } = post

    useRevalidateOnInterval({ enabled: true, interval: 60000 })

    return (
        <div className="post">
            <div className="post-header">
                <h1 className="post-title">{title}</h1>
            </div>
            <div className="post-subtitle">
                <div className="post-by">by {by}</div>
                <div className="post-time">{timeago(time)}</div>
                {url && (
                    <a className="post-link" target="_blanc" href={url}>
                        (link)
                    </a>
                )}
            </div>
            <Comments comments={comments} />
        </div>
    )
}

export default PostPage

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
    ...HeaderLinks(),
    ...LoaderLinks(),
    ...CommentsLinks(),
]
