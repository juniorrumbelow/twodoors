import { render, screen } from '@testing-library/react';
import Header from '../../Header';

describe('Header', () => {
  it('renders the title as an h1', () => {
    render(<Header title="Test Page" />);
    expect(screen.getByRole('heading', { name: 'Test Page' })).toBeInTheDocument();
  });

  it('renders with an empty title', () => {
    render(<Header title="" />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('applies the title class', () => {
    render(<Header title="Hello" />);
    expect(screen.getByRole('heading')).toHaveClass('title');
  });
});
