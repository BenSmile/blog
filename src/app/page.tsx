import { PostList } from "@/components/PostList";
import Image from "next/image";

export default function Home() {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='mad-md:hidden' />
        <span className='orange_gradient text-center'> Feel Free, And Grow</span>
      </h1>
      <p className='desc text-center'></p>

      <PostList />
    </section>
  );
}
