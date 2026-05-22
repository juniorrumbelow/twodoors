import { render } from '@testing-library/react';
import BedIcon from '../../../icons/BedIcon';

describe('BedIcon', () => {
  it('renders an SVG element', () => {
    const { container } = render(<BedIcon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies the default className', () => {
    const { container } = render(<BedIcon />);
    expect(container.querySelector('svg')).toHaveClass('h-5', 'w-5');
  });

  it('applies a custom className', () => {
    const { container } = render(<BedIcon className="h-8 w-8 text-red-500" />);
    expect(container.querySelector('svg')).toHaveClass('h-8', 'w-8', 'text-red-500');
  });
});
