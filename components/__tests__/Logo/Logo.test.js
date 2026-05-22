import { render, screen } from '@testing-library/react';
import Logo from '../../Logo';

jest.mock('next/link', () => ({ children, href, 'aria-label': ariaLabel, ...props }) => (
  <a href={href} aria-label={ariaLabel} {...props}>{children}</a>
));

describe('Logo', () => {
  it('links to the home page', () => {
    render(<Logo />);
    expect(screen.getByRole('link', { name: /twodoors/i })).toHaveAttribute('href', '/');
  });

  it('renders an SVG', () => {
    const { container } = render(<Logo />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('scales SVG height based on size prop', () => {
    const { container: c1 } = render(<Logo size="text-2xl" />);
    const { container: c2 } = render(<Logo size="text-4xl" />);
    const h1 = Number(c1.querySelector('svg').getAttribute('height'));
    const h2 = Number(c2.querySelector('svg').getAttribute('height'));
    expect(h2).toBeGreaterThan(h1);
  });

  it('inverted prop renders white ink colour', () => {
    const { container } = render(<Logo inverted />);
    const paths = container.querySelectorAll('path[fill="#FFFFFF"]');
    expect(paths.length).toBeGreaterThan(0);
  });
});
