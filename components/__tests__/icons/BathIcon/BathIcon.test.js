import { render } from '@testing-library/react';
import BathIcon from '../../../icons/BathIcon';

describe('BathIcon', () => {
  it('renders an SVG element', () => {
    const { container } = render(<BathIcon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies the default className', () => {
    const { container } = render(<BathIcon />);
    expect(container.querySelector('svg')).toHaveClass('h-5', 'w-5');
  });

  it('applies a custom className', () => {
    const { container } = render(<BathIcon className="h-6 w-6" />);
    expect(container.querySelector('svg')).toHaveClass('h-6', 'w-6');
  });
});
