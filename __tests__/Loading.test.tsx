import { render, screen } from '@testing-library/react'
import Loading from '@/components/Loading'; // Adjust the import path as necessary

describe('Loading Component', () => {
    it('renders correctly', () => {
        render(<Loading />);

        // Check if the logo image is present
        expect(screen.getByAltText('my blog Logo')).toBeInTheDocument();

        // Check if the image has the correct class for animation
        expect(screen.getByAltText('my blog Logo')).toHaveClass('animate-ping');

    });
});
