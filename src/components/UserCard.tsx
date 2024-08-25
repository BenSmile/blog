import React from 'react'

interface UserCardProps {
    user: TUser
}

const UserCard = ({ user }: UserCardProps) => {
    return (
        <div className='w-full'>
            <div className="">{user?.name}</div>
            <div className="">{user?.name}</div>
            <div className="">{user?.name}</div>
            <div className="">{user?.name}</div>
        </div>
    )
}

export default UserCard