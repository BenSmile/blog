import React from 'react'
import PostDetails from './PostDetails'

type Params = {
    params: {
        postId: string
    }
}


const Page = ({ params: { postId } }: Params) => {

    return (
        <div>
            <PostDetails postId={postId} />
        </div>
    )
}

export default Page;