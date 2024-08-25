import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const { userId, title, body } = await req.json();

    console.log("data : ", {
        "title": title,
        "body": body,
        "userId": 1,

    })

    try {
        await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                "title": title,
                "body": body,
                "userId": userId,

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    } catch {

    }


    return new Response(JSON.stringify({ "message": "post created" }), {
        status: 201
    })

}
