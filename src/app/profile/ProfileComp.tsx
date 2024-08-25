'use client'

import { useSession } from 'next-auth/react';
import React from 'react'

const ProfileComp = () => {

    const { data: session } = useSession();

    return (
        <section className='w-full'>
            <h1 className='head_text text-left'><span className='blue_gradient'>My</span> Profile</h1>

            <p className='desc text-left'>Full name : {session?.user?.name}</p>
            <p className='desc text-left'>Email : {session?.user?.email}</p>

        </section>
    )
}

export default ProfileComp