import { Link } from "@remix-run/react"
import type { FC } from "react"
import { memo } from "react"
import type { IPost } from "~/types/Post"
import timeago from "~/utils/timeValidation"

const Post: FC<IPost> = (props) => {
    const { by, id, score, time, title, kids } = props

    // if post === {}
    if (Object.entries(props).length === 0) {
        return null
    }

    return (
        <div className="post-wrapper">
            <Link className="post-title" to={`post/${id}`}>
                <h3>{title}</h3>
            </Link>
            <div className="post-bottom">
                <div className="post-by"> by {by}</div>
                <div>{score} points</div>
            </div>
            {kids && <div>{kids.length} comments</div>}
            <div className="post-time">{timeago(time)}</div>
        </div>
    )
}

export default memo(Post)
