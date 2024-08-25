import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSession } from 'next-auth/react';
import ProfileComp from '@/app/profile/ProfileComp';

// Mock the useSession hook
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

describe('ProfileComp Component', () => {
    test('renders user profile information when session data is available', () => {
        // Mock session data
        (useSession as jest.Mock).mockReturnValue({
            data: {
                user: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                },
            },
        });

        render(<ProfileComp />);

        // Check if the user information is displayed
        expect(screen.getByText('Full name : John Doe')).toBeInTheDocument();
        expect(screen.getByText('Email : john.doe@example.com')).toBeInTheDocument();
    });

    test('renders nothing when session data is not available', () => {
        // Mock no session data
        (useSession as jest.Mock).mockReturnValue({
            data: null,
        });

        render(<ProfileComp />);

        // Check if the profile information is not displayed
        expect(screen.queryByText('Full name :')).not.toBeInTheDocument();
        expect(screen.queryByText('Email :')).not.toBeInTheDocument();
    });
});
