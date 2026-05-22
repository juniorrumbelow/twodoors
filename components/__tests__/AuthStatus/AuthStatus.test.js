import { render } from '@testing-library/react';
import AuthStatus from '../../AuthStatus';

jest.mock('../../../context/AuthContext', () => ({
  useAuth: jest.fn(() => ({ user: null })),
}));

describe('AuthStatus', () => {
  it('renders nothing (component body is currently commented out)', () => {
    const { container } = render(<AuthStatus />);
    expect(container.firstChild).toBeNull();
  });
});
