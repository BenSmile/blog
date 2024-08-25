"use client"
import React, { useState, useEffect } from 'react'
import PostCard from './PostCard'
import Loading from './Loading';

interface PostDataProps {
    data: TPost[];
}

const PostData = ({ data }: PostDataProps) => {
    return (
        <div className="mt-16 prompt_layout ">
            {
                data.map(post => (<PostCard
                    post={post}
                    key={post.id}
                />))
            }
        </div>
    )
}

export const PostList = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<TPost[]>([]);
    const [posts, setPosts] = useState<TPost[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        setSearchText(e.target.value.toLowerCase());
        setTimeout(() => {
            const searchResult = filterPosts();
            setSearchResults(searchResult);
        }, 500)
        setIsLoading(false);
    }

    const filterPosts = () => {
        return posts.filter(post => {
            return (
                post.body.toLowerCase().includes(searchText) ||
                post.title.toLowerCase().includes(searchText)
            );
        });
    };

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setPosts(data);
            setIsLoading(false);
        };
        fetchPosts();
    }, [])

    return (
        <section className="feed">
            <form action="" className="relative w-full flex-center">
                <input type="text" placeholder="Search for a tag or username"
                    value={searchText}
                    required
                    className="search_input peer"
                    onChange={handleSearchChange} />
            </form>

            {isLoading ? <Loading />
                :
                <PostData
                    data={searchText ? searchResults : posts}

                />}
        </section>
    )
}
