'use client'

import Loading from '@/components/Loading';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';


interface PostDetailsProps {
    postId: string;
}

const PostDetails = ({ postId }: PostDetailsProps) => {

    const { data: session } = useSession();

    const [post, setPost] = useState<TPost>({
        id: 0,
        body: "",
        title: "",
        userId: 0
    })
    const [comments, setComments] = useState<TComment[]>([])
    const [comment, setComment] = useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [author, setAuthor] = useState<TUser>({
        id: 0,
    });

    const handleSubmitComment = async () => {

    }

    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            const response = await fetch(`/api/posts/${postId}`);
            const data = await response.json();
            console.log('post ', data)
            setPost(data["post"]);
            setComments(data["comments"]);
            setAuthor(data["author"]);
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
                    comments?.map(comment => (
                        <div className='comment-card'>
                            <div className="flex justify-between items-start">
                                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer ">
                                    <Image
                                        alt="user_image"
                                        src={`https://picsum.photos/${(comment?.id % 10) * 100}`}
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

                {session?.user && <form onSubmit={handleSubmitComment}
                    className='mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism'>
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Leave a comment
                        </span>
                        <textarea
                            value={comment}
                            required
                            placeholder='Leave your thoughts here'
                            className='form_textarea'
                            onChange={e => setComment(e.target.value)} />
                    </label>

                    <div className="flex-end mx-3 mb-5 gap-4">
                        <Link
                            href='/'
                            className='text-gray-500 text-sm'>
                            Cancel
                        </Link>

                        <button
                            type='submit'
                            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'

                        >
                            Comment
                        </button>
                    </div>
                </form>}
            </div>
    )
}

export default PostDetails