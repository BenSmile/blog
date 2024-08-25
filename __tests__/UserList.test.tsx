import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UsersList from '@/components/UsersList';


jest.mock('next/image', () => (props: any) => <img {...props} />);

jest.mock('../src/components/Loading', () => () => <div>Loading</div>);

describe('UsersList Component', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([
                    {
                        id: 1,
                        name: 'John Doe',
                        username: 'johndoe',
                        email: 'john@example.com',
                        phone: '123-456-7890',
                        website: 'johndoe.com',
                        company: { name: 'Doe Inc.' }
                    }
                ]),
            })
        ) as jest.Mock;
    });

    it('renders correctly and shows loading initially', async () => {
        render(<UsersList />);

        // Check if the loading component is shown initially
        expect(screen.getByText('Loading')).toBeInTheDocument();

        // Wait for data to load and check if the loading component is removed
        await waitFor(() => expect(screen.queryByText('Loading')).toBeNull());

        // Check if the table is rendered with user data
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('johndoe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
        expect(screen.getByText('123-456-7890')).toBeInTheDocument();
        expect(screen.getByText('View')).toBeInTheDocument();
    });

    it('filters users based on search input', async () => {
        render(<UsersList />);

        // Wait for data to load
        await waitFor(() => expect(screen.queryByText('Loading')).toBeNull());

        // Simulate search input
        fireEvent.change(screen.getByPlaceholderText('Search for a tag or username'), {
            target: { value: 'John' }
        });

        // Check if the filtered results are displayed
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('View')).toBeInTheDocument();
    });
});
