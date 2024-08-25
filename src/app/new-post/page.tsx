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
        try {
            const response = await fetch('/api/posts/new-post', {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            await response.json();

            setTimeout(() => {
                alert("Post created")
            }, 1000);
            router.push('/');
        } catch (error) {
            setTimeout(() => {
                alert("Post created")
            }, 1000);
            router.push('/');

        }

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