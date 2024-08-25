import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '@/app/users/page';

// Mock the UsersList component
jest.mock('../src/components/UsersList', () => () => <div>Users List Component</div>);

describe('Page Component', () => {
    test('renders UsersList component', () => {
        render(<Page />);

        // Check if the UsersList component is rendered
        expect(screen.getByText('Users List Component')).toBeInTheDocument();
    });
});
