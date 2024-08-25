// __tests__/Provider.test.tsx

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Provider from '@/components/Provider';

jest.mock('next-auth/react', () => ({
    SessionProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

describe('Provider Component', () => {
    const mockSession: Session = {
        user: {
            name: 'Test User',
            email: 'testuser@example.com',
            image: 'test-image-url',
        },
        expires: '2024-09-25T00:00:00.000Z',
    };

    test('renders children within SessionProvider', () => {
        render(
            <Provider session={mockSession}>
                <div>Test Child</div>
            </Provider>
        );

        // Check if children are rendered
        expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    test('passes session to SessionProvider', () => {
        render(
            <Provider session={mockSession}>
                <div>Test Child</div>
            </Provider>
        );

        // Check if SessionProvider is called with the correct session
        expect(SessionProvider).toHaveBeenCalledWith(
            expect.objectContaining({ session: mockSession }),
            {}
        );
    });
});
