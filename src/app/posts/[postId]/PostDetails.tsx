'use client'

import Loading from '@/components/Loading';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'


interface PostDetailsProps {
    postId: string;
}

const PostDetails = ({ postId }: PostDetailsProps) => {

    const [post, setPost] = useState<TPost>({
        id: 0,
        body: "",
        title: "",
        userId: 0
    })
    const [comments, setComments] = useState<TComment[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [author, setAuthor] = useState<TUser>({
        id: 0,
    });

    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const data = await response.json();
            setPost(data);

            console.log('post ', data)

            const authorResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${data["userId"]}`);
            const authorData = await authorResponse.json();
            setAuthor(authorData);

            const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            const commentData = await commentsResponse.json();
            setComments(commentData);
            setIsLoading(false);
        };
        fetchPost();
    }, [])

    return (
        isLoading ? <Loading /> :
            <div>

                <div className="prompt-details-card mb-3">
                    <h2 className='text-center font-semibold pb-3'>Author</h2>
                    <div className="flex justify-between items-start gap-5 ">
                        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer ">
                            <Image
                                alt="user_image"
                                src={`https://picsum.photos/${author?.id * 100}`}
                                width={100}
                                height={100}
                                className="rounded-full object-contain" />
                            <div className="flex flex-col">
                                <h3 className="font-satoshi font-semibold text-gray-900">{author?.name}</h3>
                                <p className="font-inter text-sm text-gray-500">Email: <span className='font-semibold'>{author?.email}</span></p>
                                <p className="font-inter text-sm text-gray-500">Phone: <span className='font-semibold'>{author?.phone}</span></p>
                                <p className="font-inter text-sm text-gray-500">Website: <span className='font-semibold'>{author?.website}</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="prompt-details-card">
                    <div className="flex justify-between items-start gap-5 ">
                        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer ">

                            <div className="flex flex-col">
                                <h1 className="font-satoshi font-semibold text-gray-900">{post?.title}</h1>
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