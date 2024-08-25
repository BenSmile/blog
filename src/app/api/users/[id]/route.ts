import { NextRequest } from "next/server";


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users${params.id}`);
        const data = await response.json();
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