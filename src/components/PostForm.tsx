'use client'

import Link from 'next/link';
import React from 'react'


interface PostFormProps {
    type: string;
    post: TPost;
    setPost: React.Dispatch<React.SetStateAction<TPost>>;
    handleSubmit: any;
    submitting: boolean
}

const PostForm = ({ type, post, setPost, submitting, handleSubmit }: PostFormProps) => {

    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className='head_text text-left'><span className='blue_gradient'> {type} Post</span></h1>
            <p className='desc text-left max-w-md'>
                {type} and post you IDEAAAAS
            </p>

            <form onSubmit={handleSubmit}
                className='mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism'>
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Title
                    </span>
                    <input
                        value={post?.title}
                        required
                        placeholder='Write your prompt here'
                        className='form_input'
                        onChange={e => setPost({ ...post, title: e.target.value })} />
                </label>
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Your Content
                    </span>

                    <textarea
                        value={post?.body}
                        required
                        placeholder='Write your post here'
                        className='form_textarea'
                        onChange={e => setPost({ ...post, body: e.target.value })} />
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
                        disabled={submitting}
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default PostForm