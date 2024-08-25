import { GET } from '@/app/api/users/[id]/route';
import { NextRequest } from 'next/server';

describe('GET /api/users/[id]', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the user data with a 200 status', async () => {
        const mockData = { id: 1, name: 'User 1' };

        (global.fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData),
        });

        const req = {} as NextRequest;
        const params = { id: '1' };

        const res = await GET(req, { params });

        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data).toEqual(mockData);
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
