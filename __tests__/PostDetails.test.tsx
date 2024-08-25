import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostDetails from '@/app/posts/[postId]/PostDetails';


// Mock the Loading component
jest.mock('../src/components/Loading', () => () => <div>Loading...</div>);

// Mock the Image component
jest.mock('next/image', () => ({ src, alt, width, height, className }: any) => (
    <img src={src} alt={alt} width={width} height={height} className={className} />
));

// Mock global fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                post: {
                    id: 1,
                    body: "This is a post body",
                    title: "Post Title",
                    userId: 1
                },
                comments: [
                    { id: 1, email: "commenter@example.com", body: "This is a comment" }
                ],
                author: {
                    id: 1,
                    name: "Author Name",
                    email: "author@example.com",
                    phone: "123-456-7890",
                    website: "example.com"
                }
            })
    })
) as any;

describe('PostDetails Component', () => {
    test('renders loading state initially', () => {
        render(<PostDetails postId="1" />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders post details after fetching data', async () => {
        render(<PostDetails postId="1" />);

        // Wait for the loading state to be replaced
        await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

        // Check for post details
        expect(screen.getByText('Post Title')).toBeInTheDocument();
        expect(screen.getByText(/This is a post body/)).toBeInTheDocument();

        // Check for author details
        expect(screen.getByText('Author Name')).toBeInTheDocument();
        expect(screen.getByText('Email: author@example.com')).toBeInTheDocument();
        expect(screen.getByText('Phone: 123-456-7890')).toBeInTheDocument();
        expect(screen.getByText('Website: example.com')).toBeInTheDocument();

        // Check for comments
        expect(screen.getByText('commenter@example.com')).toBeInTheDocument();
        expect(screen.getByText('This is a comment')).toBeInTheDocument();
    });
});
