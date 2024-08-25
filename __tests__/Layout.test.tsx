import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider as AuthProvider } from '@/components/Provider'; // Mocking AuthProvider
import RootLayout from '@/app/layout';

// Mock the Nav component
jest.mock('../src/components/Nav', () => () => <div>Nav Component</div>);

// Mock the Provider component
jest.mock('../src/components/Provider', () => ({ children }: { children: React.ReactNode }) => (
    <div data-testid="provider">
        {children}
    </div>
));

describe('RootLayout Component', () => {
    test('renders Nav and children components', () => {
        const session = {}; // Mock session object

        render(
            <RootLayout session={session}>
                <div>Child Component</div>
            </RootLayout>
        );

        // Check if Nav and children are rendered
        expect(screen.getByText('Nav Component')).toBeInTheDocument();
        expect(screen.getByText('Child Component')).toBeInTheDocument();
        expect(screen.getByTestId('provider')).toBeInTheDocument();
    });

    test('passes session prop to Provider', () => {
        const session = { user: { name: 'John Doe' } };

        render(
            <RootLayout session={session}>
                <div>Child Component</div>
            </RootLayout>
        );
    });
});
