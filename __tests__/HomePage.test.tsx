import Home from '@/app/page'
import { render, screen } from '@testing-library/react'

describe("Home Page - Rendering", () => {

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should have Discover & Share text', () => {

        const mockPosts = [
            { id: 1, title: 'Test Post 1', body: 'Test Body 1' },
            { id: 2, title: 'Test Post 2', body: 'Test Body 2' },
        ];

        fetchMock.mockResponseOnce(JSON.stringify(mockPosts));

        render(<Home />);
        expect(screen.getByText('Discover & Share')).toBeInTheDocument();

    })

    it('should have text input for search', () => {
        const mockPosts = [
            { id: 1, title: 'Test Post 1', body: 'Test Body 1' },
            { id: 2, title: 'Test Post 2', body: 'Test Body 2' },
        ];
        fetchMock.mockResponseOnce(JSON.stringify(mockPosts));
        render(<Home />);
        expect(screen.getByPlaceholderText("Search for a title or content")).toBeInTheDocument()
    })

    it('should have text input for search', () => {
        const mockPosts = [
            { id: 1, title: 'Test Post 1', body: 'Test Body 1' },
            { id: 2, title: 'Test Post 2', body: 'Test Body 2' },
        ];
        fetchMock.mockResponseOnce(JSON.stringify(mockPosts));
        render(<Home />);
        expect(screen.getByPlaceholderText("Search for a title or content")).toBeInTheDocument()
    })

})