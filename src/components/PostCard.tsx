'use client';

import React from "react";
import { useState } from "react";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface PostCardProps {
  post: TPost
}

const PostCard = ({ post }: PostCardProps) => {

  const { data: session } = useSession();

  const pathName = usePathname();

  const [copied, setCopied] = useState<string>('');

  return (
    <Link href={`/posts/${post.id}`} >
      <div className="prompt-card">
        <div className="flex justify-between items-start gap-5 ">
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer ">
            <Image
              alt="user_image"
              src={`https://picsum.photos/${post.userId * 100}`}
              width={40}
              height={40}
              className="rounded-full object-contain" />
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">{post?.title?.substring(0, 20)}...</h3>
            </div>
          </div>
          <div className="copy_btn" onClick={() => { }}>
            <Image alt="icon" src={copied === post.title ? '/static/assets/icons/tick.svg' : '/static/assets/icons/copy.svg'}
              width={12} height={12} />
          </div>
        </div>
        <p className="my-4 font-satoshi text-sm text-gray-700">
          {post?.body?.substring(0, 200)}...
        </p>
      </div>
    </Link>
  )
}

export default PostCard