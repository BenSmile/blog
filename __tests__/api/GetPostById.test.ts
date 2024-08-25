import { GET } from "@/app/api/posts/[id]/route";
import { NextRequest } from "next/server";


describe('GET /api/posts/[id]', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the post, comments, and author data with a 200 status', async () => {
        const postData = { id: 1, title: 'Post 1', userId: 1 };
        const commentData = [{ id: 1, body: 'Comment 1' }];
        const authorData = { id: 1, name: 'Author 1' };

        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue(postData),
            })
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue(commentData),
            })
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue(authorData),
            });

        const req = {} as NextRequest;
        const params = { id: '1' };

        const res = await GET(req, { params });

        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data).toEqual({
            post: postData,
            comments: commentData,
            author: authorData,
        });
    });

    it('should return a 500 status on error', async () => {
        (global.fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

        const req = {} as NextRequest;
        const params = { id: '1' };

        const res = await GET(req, { params });

        expect(res.status).toBe(500);
        const text = await res.text();
        expect(text).toBe('Failed to fetch all prompts');
    });
});
