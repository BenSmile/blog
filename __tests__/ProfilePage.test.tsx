import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '@/app/profile/page';

jest.mock('../src/app/profile/ProfileComp', () => () => <div>Profile Component</div>);

describe('Profile Component', () => {
    test('renders ProfileComp component', () => {
        render(<Profile />);

        expect(screen.getByText('Profile Component')).toBeInTheDocument();
    });
});
