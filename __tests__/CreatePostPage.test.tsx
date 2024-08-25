// __tests__/Page.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

import Page from '@/app/new-post/page';

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

global.fetch = jest.fn();

describe('Page Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders PostForm with initial state', () => {
        render(<Page />);

        expect(screen.getByText(/Create Post/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Write your prompt here')).toHaveValue('');
        expect(screen.getByPlaceholderText('Write your post here')).toHaveValue('');
        expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
        expect(screen.getByText(/Create/i)).toBeInTheDocument();
    });

    test('handles form submission and redirects on success', async () => {
        // Mock successful fetch response
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue({}),
        });

        // Mock useRouter
        const push = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push });

        render(<Page />);

        // Simulate user input
        fireEvent.change(screen.getByPlaceholderText('Write your prompt here'), {
            target: { value: 'New Title' },
        });
        fireEvent.change(screen.getByPlaceholderText('Write your post here'), {
            target: { value: 'New Body' },
        });

        // Simulate form submission
        fireEvent.click(screen.getByText(/Create/i));

        // Wait for the navigation
        await waitFor(() => expect(push).toHaveBeenCalledWith('/'));
    });

    test('shows alert on form submission failure', async () => {
        // Mock failed fetch response
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: jest.fn().mockResolvedValue({}),
        });

        // Mock global alert
        const alert = jest.spyOn(window, 'alert').mockImplementation(() => { });

        render(<Page />);

        // Simulate form submission
        fireEvent.click(screen.getByText(/Create/i));

        // Wait for the alert
        await waitFor(() => expect(alert).toHaveBeenCalledWith('Error creating post:Error: Failed to create post'));
    });
});
