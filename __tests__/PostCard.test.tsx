import { render, screen } from '@testing-library/react';
import PostCard from '@/components/PostCard';

jest.mock('next/image', () => (props: any) => <img {...props} />);

describe('PostCard Component', () => {
    const post = {
        id: 1,
        userId: 2,
        title: 'Test Post Title',
        body: 'This is a test post body that is sufficiently long to test truncation.',
    };

    it('renders correctly', () => {
        render(<PostCard post={post} />);

        expect(screen.getByAltText('user_image')).toBeInTheDocument();
        expect(screen.getByAltText('user_image')).toHaveAttribute('src', `https://picsum.photos/${post.userId * 100}`);

        expect(screen.getByText(/Test Post Title.../)).toBeInTheDocument();

        expect(screen.getByText(/This is a test post body that is suffic/)).toBeInTheDocument();

        expect(screen.getByAltText('icon')).toBeInTheDocument();
    });

    it('navigates to the correct URL on click', () => {
        const { container } = render(<PostCard post={post} />);
        const link = container.querySelector('a');
        expect(link).toHaveAttribute('href', `/posts/${post.id}`);
    });

    it('shows correct icon based on copied state', () => {
        render(<PostCard post={post} />);

        // Initially, the icon should be 'copy.svg'
        expect(screen.getByAltText('icon')).toHaveAttribute('src', '/static/assets/icons/copy.svg');
    });
});
