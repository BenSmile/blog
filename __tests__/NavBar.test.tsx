import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSession, getProviders, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';

// Mock next-auth and next/navigation
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
    getProviders: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Nav Component', () => {
    const mockPush = jest.fn();
    const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;
    const mockGetProviders = getProviders as jest.MockedFunction<typeof getProviders>;
    const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        jest.clearAllMocks();
    });

    test('renders navigation links based on session state', async () => {
        // Setup mocks for authenticated user
        mockUseSession.mockReturnValue({
            data: {
                user: {
                    name: 'Test User',
                    email: 'testuser@example.com',
                    image: 'test-image-url',
                },
                expires: '2024-08-25T00:00:00.000Z',
            },
            status: 'authenticated',
            update: jest.fn(),
        });

        mockGetProviders.mockResolvedValue({
            google: {
                id: 'google',
                name: 'Google',
                type: 'oauth',
            },
        });

        mockUseRouter.mockReturnValue({ push: mockPush });

        render(<Nav />);

        // Check if user-related links and buttons are displayed
        expect(screen.getByText('Create Post')).toBeInTheDocument();
        expect(screen.getByText('Users')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Sign Out/i })).toBeInTheDocument();
        expect(screen.getByAltText('Profile Image')).toHaveAttribute('src', 'test-image-url');
    });

    test('renders sign-in buttons when no user is authenticated', async () => {
        mockUseSession.mockReturnValue({
            data: null,
            status: 'unauthenticated',
            update: jest.fn(),
        });

        mockGetProviders.mockResolvedValue({
            google: {
                id: 'google',
                name: 'Google',
                type: 'oauth',
            },
        });

        render(<Nav />);

        // Check if sign-in buttons are displayed
        expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    });

    test('handles sign out', async () => {
        mockUseSession.mockReturnValue({
            data: {
                user: {
                    name: 'Test User',
                    email: 'testuser@example.com',
                    image: 'test-image-url',
                },
                expires: '2024-08-25T00:00:00.000Z',
            },
            status: 'authenticated',
            update: jest.fn(),
        });

        mockGetProviders.mockResolvedValue({
            google: {
                id: 'google',
                name: 'Google',
                type: 'oauth',
            },
        });

        mockUseRouter.mockReturnValue({ push: mockPush });

        render(<Nav />);

        // Click on Sign Out button
        fireEvent.click(screen.getByRole('button', { name: /Sign Out/i }));

        // Check if signOut function is called and user is redirected
        expect(signOut).toHaveBeenCalled();
        await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
    });

    test('handles dropdown menu toggle', async () => {
        mockUseSession.mockReturnValue({
            data: {
                user: {
                    name: 'Test User',
                    email: 'testuser@example.com',
                    image: 'test-image-url',
                },
                expires: '2024-08-25T00:00:00.000Z',
            },
            status: 'authenticated',
            update: jest.fn(),
        });

        mockGetProviders.mockResolvedValue({
            google: {
                id: 'google',
                name: 'Google',
                type: 'oauth',
            },
        });

        render(<Nav />);

        // Click on profile image to toggle dropdown
        fireEvent.click(screen.getByAltText('Profile Image'));

        // Check if dropdown menu is displayed
        expect(screen.getByText('My Profile')).toBeInTheDocument();
        expect(screen.getByText('Create Prompt')).toBeInTheDocument();
        expect(screen.getByText('Users')).toBeInTheDocument();
    });
});