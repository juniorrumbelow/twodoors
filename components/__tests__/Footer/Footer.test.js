import { render, screen } from '@testing-library/react';
import Footer from '../../Footer';

jest.mock('next/link', () => ({ children, href, ...props }) => (
  <a href={href} {...props}>{children}</a>
));

describe('Footer', () => {
  it('renders copyright notice', () => {
    render(<Footer />);
    expect(screen.getByText(/2026 twodoors/)).toBeInTheDocument();
  });

  it('renders a link to the home page via Logo', () => {
    render(<Footer />);
    const homeLinks = screen.getAllByRole('link');
    expect(homeLinks.some((l) => l.getAttribute('href') === '/')).toBe(true);
  });

  it('renders as a footer element', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });
});
