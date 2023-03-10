import type { IComment } from "~/types/Post"
import axios from "axios"

interface fetchCommentsParams {
    kidsID: number[]
}

export const fetchComments = async (params: fetchCommentsParams) => {
    const comments: IComment[] = await axios
        .all([
            params.kidsID.map((kidId: number) =>
                axios.get(
                    `https://hacker-news.firebaseio.com/v0/item/${kidId}.json?`
                )
            ),
        ])
        .then(
            axios.spread((allData) =>
                Promise.all(allData).then((commentData) =>
                    commentData.map((comment) => comment.data)
                )
            )
        )
    return {
        comments,
    }
}
