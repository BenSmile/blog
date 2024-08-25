"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

type Providers = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;


const Nav = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState<Providers>(null);
    const [toggleDropDown, setToggleDropDown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])
    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image src='/static/assets/images/logo.svg' alt='my blog Logo'
                    width={30} height={30} className='object-contain' />
                <p className='logo_text'>MyBlog</p>
            </Link>

            {/* Desktop Navigation */}

            <div className="sm:flex hidden">
                {
                    session?.user ? <div className="flex gap-3 md:gap-5">
                        <Link className='black_btn' href='/new-post'>Create Post</Link>
                        <Link className='black_btn' href='/users'>Users</Link>
                        <button className='outline_btn' type='button' onClick={signOut as any}>Sign Out</button>
                        <Link href='/profile'>
                            <Image src={session?.user?.image as string}
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt='Profile Image' />
                        </Link>
                    </div> :
                        <>
                            {
                                providers && Object
                                    .values(providers)
                                    .map(provider => (
                                        <button type='button'
                                            className='black_btn'
                                            key={provider.name}
                                            onClick={() => signIn(provider.id)} >
                                            Sign In
                                        </button>
                                    ))
                            }
                        </>
                }
            </div>

            {/* Mobile Navigation */}

            <div className="sm:hidden flex relative">
                {
                    session?.user ? (
                        <div className="flex">
                            <Image src={session?.user?.image as string}
                                width={37}
                                height={37}
                                className='rounded-full'
                                onClick={() => setToggleDropDown(prev => !prev)}
                                alt='Profile Image' />

                            {
                                toggleDropDown && (
                                    <div className="dropdown">
                                        <Link href='/profile'
                                            className='dropdown_link'
                                            onClick={() => setToggleDropDown(false)}>
                                            My Profile
                                        </Link>
                                        <Link href='/create-prompt'
                                            className='dropdown_link'
                                            onClick={() => setToggleDropDown(false)}>
                                            Create Prompt
                                        </Link>
                                        <button type='button' className='mt-5 w-full black_btn'
                                            onClick={() => {
                                                setToggleDropDown(false);
                                                signOut();
                                            }} >
                                            Sign Out
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ) :
                        <>
                            <>
                                {
                                    providers && Object
                                        .values(providers)
                                        .map(provider => (

                                            <button
                                                type='button'
                                                onClick={() => signIn(provider.id)}
                                                className='black_btn'
                                                key={provider.name} >
                                                Sign In
                                            </button>
                                        ))
                                }
                            </>
                        </>
                }
            </div>

        </nav>
    )
}

export default Nav;