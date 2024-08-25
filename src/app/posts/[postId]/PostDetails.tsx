'use client'

import Loading from '@/components/Loading';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'


interface PostDetailsProps {
    postId: string;
}

const PostDetails = ({ postId }: PostDetailsProps) => {

    const [post, setPost] = useState<TPost | undefined>(undefined)
    const [comments, setComments] = useState<TComment[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(false);


    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const data = await response.json();
            setPost(data);

            const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            const commentData = await commentsResponse.json();
            setComments(commentData);
            setIsLoading(false);
        };
        fetchPost();
    }, [])

    // if (isLoading) {
    //     return <Loading />;
    // }

    // if (!post) {
    //     return <p>No post data available.</p>;
    // }

    return (
        isLoading ? <Loading /> : <div>
            <div className="prompt-details-card">
                <div className="flex justify-between items-start gap-5 ">
                    <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer ">
                        <Image
                            alt="user_image"
                            src={`https://picsum.photos/${post?.userId * 100}`}
                            width={40}
                            height={40}
                            className="rounded-full object-contain" />
                        <div className="flex flex-col">
                            <h3 className="font-satoshi font-semibold text-gray-900">{post?.title}</h3>
                            <p className="font-inter text-sm text-gray-500">{post?.userId}</p>
                        </div>
                    </div>

                </div>
                <p className="my-4 font-satoshi text-sm text-gray-700">
                    {post?.body}
                </p>
            </div>

            <h3 className='font-semibold text-slate-400 p-4'>Comments</h3>
            {
                comments.map(comment => (
                    <div className='comment-card'>
                        <div className="flex justify-between items-start">
                            <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer ">
                                <Image
                                    alt="user_image"
                                    src={`https://picsum.photos/${comment?.id * 100}`}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-contain" />
                                <div className="flex flex-col gap-1">
                                    <p className="font-satoshi font-semibold text-gray-900">{comment?.email}</p>
                                    <p className="my-4 font-satoshi text-sm text-gray-700">{post?.body}</p>
                                </div>
                            </div>

                        </div>

                    </div>))
            }
        </div>
    )
}

export default PostDetails