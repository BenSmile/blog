import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '@/app/posts/[postId]/page';
import PostDetails from '@/app/posts/[postId]/PostDetails';

jest.mock('../src/app/posts/[postId]/PostDetails', () => {
    return jest.fn(() => <div>PostDetails Component</div>);
});

describe('Page Component', () => {
    test('renders PostDetails with correct postId', () => {
        const postId = '123';

        render(<Page params={{ postId }} />);

        expect(screen.getByText('PostDetails Component')).toBeInTheDocument();

        expect(PostDetails).toHaveBeenCalledWith({ postId }, {});
    });
});
