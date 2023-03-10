import type { FC } from "react"
import { useMemo, memo } from "react"
import { useState } from "react"
import BackIcon from "~/assets/svg/BackIcon"
import type { IComment } from "~/types/Post"
import { fetchComments } from "~/utils/fetchComments"
import timeago from "~/utils/timeValidation"

const Comment: FC<IComment> = (props) => {
    const { id, text, by, time, kids, deleted } = props
    const [childComments, setChildComments] = useState(
        [] as unknown as IComment[]
    )
    const [isChildOpened, setIsChildOpened] = useState(false)

    const showComments = useMemo(
        () =>
            childComments.length !== 0 &&
            !childComments.some((comment) => comment.deleted),
        [childComments]
    )

    if (deleted) {
        return null
    }

    // recursive passage through the list of kids.
    // if we have children and someone pressed the button,
    // then we set the data to the setChildComments variable
    // and call the component Comment render
    const openKids = () => {
        fetchComments({ kidsID: kids || [] }).then((data) =>
            setChildComments(data.comments)
        )
        setIsChildOpened(true)
    }

    return (
        <div className="comment" key={id}>
            <div className="comment-header">
                {kids && (
                    <button
                        className={`comment-btn__open ${
                            isChildOpened && "active"
                        }`}
                        onClick={openKids}
                    >
                        <BackIcon
                            width="16px"
                            className="open-icon"
                            fill="black"
                        />
                    </button>
                )}
                <div
                    dangerouslySetInnerHTML={{ __html: text }}
                    className="comment-text"
                />
            </div>
            <div className="comment-bottom">
                <div className="comment-by">by {by}</div>
                <div>{timeago(time)}</div>
            </div>
            {showComments &&
                childComments.map((comment: IComment) => (
                    <Comment {...comment} key={comment.id} />
                ))}
        </div>
    )
}

export default memo(Comment)
