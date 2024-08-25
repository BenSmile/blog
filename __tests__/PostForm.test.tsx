// __tests__/PostForm.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostForm from '@/components/PostForm';

describe('PostForm Component', () => {
    const mockSetPost = jest.fn();
    const mockHandleSubmit = jest.fn();

    const mockPost = {
        id: 0,
        title: 'Test Title',
        body: 'Test Body',
        userId: 0
    };

    test('renders correctly with given props', () => {
        render(
            <PostForm
                type='Create'
                post={mockPost}
                setPost={mockSetPost}
                submitting={false}
                handleSubmit={mockHandleSubmit}
            />
        );

        expect(screen.getByText(/Create Post/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Write your prompt here')).toHaveValue('Test Title');
        expect(screen.getByPlaceholderText('Write your post here')).toHaveValue('Test Body');
        expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
        expect(screen.getByText(/Create/i)).toBeInTheDocument();
    });

    test('calls setPost when input values change', () => {
        render(
            <PostForm
                type='Create'
                post={mockPost}
                setPost={mockSetPost}
                submitting={false}
                handleSubmit={mockHandleSubmit}
            />
        );

        fireEvent.change(screen.getByPlaceholderText('Write your prompt here'), {
            target: { value: 'New Title' },
        });
        fireEvent.change(screen.getByPlaceholderText('Write your post here'), {
            target: { value: 'New Body' },
        });

        expect(mockSetPost).toHaveBeenCalledWith({ title: 'New Title', body: 'New Body' });
    });

    test('handles form submission', () => {
        render(
            <PostForm
                type='Create'
                post={mockPost}
                setPost={mockSetPost}
                submitting={false}
                handleSubmit={mockHandleSubmit}
            />
        );

        // Simulate form submission
        fireEvent.submit(screen.getByRole('form'));

        // Check if handleSubmit was called
        expect(mockHandleSubmit).toHaveBeenCalled();
    });

    test('disables submit button when submitting', () => {
        render(
            <PostForm
                type='Create'
                post={mockPost}
                setPost={mockSetPost}
                submitting={true}
                handleSubmit={mockHandleSubmit}
            />
        );

        // Check if button is disabled
        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.getByRole('button')).toHaveTextContent('Creating...');
    });
});
