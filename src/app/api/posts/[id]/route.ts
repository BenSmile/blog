import { NextRequest } from "next/server";
import { comment } from "postcss";


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {

        console.log("params ", params)

        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
        const postData = await postResponse.json();

        const responseComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}/comments`);
        const commentData = await responseComments.json();

        const authorResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData["userId"]}`);
        const authorData = await authorResponse.json();


        const data = {
            "post": postData,
            "comments": commentData,
            "author": authorData
        }

        console.log("data postn:", postData)
        return new Response(JSON.stringify(data), {
            status: 200
        })
    } catch (error) {
        console.log('error => ', error)
        return new Response('Failed to fetch all prompts', {
            status: 500
        })
    }
}