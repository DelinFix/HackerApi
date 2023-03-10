import type { IPost } from "~/types/Post"
import axios from "axios"

interface fetchPostsParams {
    limit?: string
}

export const fetchPosts = async (params: fetchPostsParams) => {
    const res = await axios.get(
        "https://hacker-news.firebaseio.com/v0/newstories.json?",
        {
            params: {
                orderBy: '"$key"',
                limitToFirst: params.limit,
            },
        }
    )

    const posts: IPost[] = await axios
        .all([
            res.data.map((id: number) =>
                axios.get(
                    `https://hacker-news.firebaseio.com/v0/item/${id}.json?`
                )
            ),
        ])
        .then(
            axios.spread((allData) =>
                Promise.all(allData).then((postData) =>
                    postData.map((post) => post.data)
                )
            )
        )

    return posts
}
