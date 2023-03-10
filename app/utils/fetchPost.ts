import type { IPost, IComment } from "~/types/Post"
import axios from "axios"

interface fetchPostParams {
    id: string
}

export const fetchPost = async (params: fetchPostParams) => {
    const res = await axios(
        `https://hacker-news.firebaseio.com/v0/item/${params.id}.json?`
    )

    if (res.data.kids) {
        const comments: IComment[] = await axios
            .all([
                res.data.kids.map((kidId: number) =>
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
            post: res.data as IPost,
            comments,
        }
    }
    return {
        post: res.data as IPost,
        comments: [],
    }
}
