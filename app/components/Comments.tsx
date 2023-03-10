import { useRevalidator } from "@remix-run/react"
import type { FC } from "react"
import Loader from "./Loader"
import type { LinksFunction } from "@remix-run/node"
import styles from "~/styles/components/Comments.css"
import Comment from "./Comment"
import type { IComment } from "~/types/Post"

interface ICommentProps {
    comments: IComment[]
}

const Comments: FC<ICommentProps> = (props) => {
    const { comments } = props
    const revalidator = useRevalidator()

    if (comments.length === 0) {
        return null
    }

    const updatePost = () => {
        revalidator.revalidate()
    }

    return (
        <div>
            <Loader show={revalidator.state !== "idle"} />
            <div className="comments">
                <div className="comments-title">
                    Comment{comments.length > 1 && "s"} ({comments.length}):
                </div>
                <button className="comments-btn__update" onClick={updatePost}>
                    Update comments
                </button>
            </div>
            <div>
                {comments.map((comment) => (
                    <Comment {...comment} key={comment?.id} />
                ))}
            </div>
        </div>
    )
}

export default Comments

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: styles }]
}
