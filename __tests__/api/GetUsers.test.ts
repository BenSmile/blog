import { GET } from "@/app/api/users/route";

describe('GET /api/users', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a 200 status and a list of users', async () => {
        const mockData = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
        (global.fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData),
        });

        const req = {};
        const res = await GET(req);

        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data).toEqual(mockData);
    });

    it('should return a 500 status on error', async () => {
        (global.fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

        const req = {};
        const res = await GET(req);

        expect(res.status).toBe(500);
        const text = await res.text();
        expect(text).toBe('Failed to fetch all prompts');
    });
});
