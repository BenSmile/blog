import { PostList } from '@/components/PostList';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('../src/components/PostCard', () => () => <div>PostCard</div>);
jest.mock('../src/components/Loading', () => () => <div>Loading</div>);

describe('PostList Component', () => {
    beforeEach(() => {
        // Mock the fetch function
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: 1, title: 'Test Post', body: 'This is a test post' }]),
            })
        ) as jest.Mock;
    });

    it('renders correctly and shows loading initially', async () => {
        render(<PostList />);
        expect(screen.getByText('Loading')).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByText('Loading')).toBeNull());
        expect(screen.getByText('PostCard')).toBeInTheDocument();
    });

    it('filters posts based on search input', async () => {
        render(<PostList />);
        await waitFor(() => expect(screen.queryByText('Loading')).toBeNull());

        fireEvent.change(screen.getByPlaceholderText('Search for a title or content'), {
            target: { value: 'Test' }
        });

        expect(screen.getByText(/Test/)).toBeInTheDocument();
    });
});
