


export const GET = async (req: any) => {
    try {

        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
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