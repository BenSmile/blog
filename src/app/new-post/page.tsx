'use client'

import PostForm from '@/components/PostForm'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'


const Page = () => {

    const router = useRouter();


    const [post, setPost] = useState<TPost>({
        id: 0,
        body: "",
        title: "",
        userId: 1
    });
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const createPost = async () => {
        setIsLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(_ => {
            setIsLoading(false);
            router.push('/');
        }).catch(_ => {
            setIsLoading(false);
            router.push('/');
        })
    }

    return (
        <PostForm
            type='Create'
            post={post}
            setPost={setPost}
            submitting={isLoading}
            handleSubmit={createPost}
        />
    )
}

export default Page