'use client'
import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import Image from 'next/image'
import Link from 'next/link'

const UsersData = ({ data }: { data: TUser[] }) => {
    return (
        <div className="mt-16 flex flex-col w-full">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">#</th>
                        <th className="border border-gray-300 px-4 py-2">Photo</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Username</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Phone</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (

                        <tr key={user.id}>
                            <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Image
                                    alt="user_image"
                                    src={`https://picsum.photos/${user.id * 100}`}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-contain" />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                            <td className="border border-gray-300 px-4 py-2"><Link href={`/users/${user.id}`} />
                                <p
                                    className="font-inter text-sm green_gradient cursor-pointer"
                                >
                                    View
                                </p>
                            </td>
                        </tr>


                    ))}
                </tbody>
            </table>
        </div>
    )
}

const UsersList = () => {

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<TUser[]>([]);
    const [users, setUsers] = useState<TUser[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        setSearchText(e.target.value.toLowerCase());
        setTimeout(() => {
            const searchResult = filterUsers();
            setSearchResults(searchResult);
        }, 500)
        setIsLoading(false);
    }

    const filterUsers = () => {
        return users.filter(user => {
            return (
                user.name.toLowerCase().includes(searchText) ||
                user.username.toLowerCase().includes(searchText) ||
                user.email.toLowerCase().includes(searchText) ||
                user.phone.toLowerCase().includes(searchText) ||
                user.website.toLowerCase().includes(searchText) ||
                user.company.name.toLowerCase().includes(searchText)
            );
        });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            setUsers(data);
            setIsLoading(false);
        };
        fetchUsers()
    }, [])

    return (
        <div>
            <form action="" className="relative w-full flex-center">
                <input type="text" placeholder="Search for a tag or username"
                    value={searchText}
                    required
                    className="search_input peer"
                    onChange={handleSearchChange} />
            </form>

            {
                isLoading ? <Loading /> :
                    <UsersData data={searchText ? searchResults : users} />
            }

        </div>
    )
}

export default UsersList