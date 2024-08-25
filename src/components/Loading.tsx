import Image from 'next/image'
import React from 'react'

export default function Loading() {
    return (
        <div className='flex flex-col justify-center items-center gap-3 w-full min-h-[calc(100vh-160px)] bg-transparent'>
            <div className='flex flex-col items-center justify-center gap-6'>
                <div className='text-vodafone'>
                    <Image src='/static/assets/images/logo.svg' alt='my blog Logo'
                        width={50} height={50} className='object-contain animate-ping' />
                </div>
            </div>
        </div>
    )
}

