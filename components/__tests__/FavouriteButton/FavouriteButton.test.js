import { render, screen, fireEvent } from '@testing-library/react';
import FavouriteButton from '../../FavouriteButton';
import { useAuth } from '../../../context/AuthContext';
import { useFavourites } from '../../../context/FavouritesContext';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ push: mockPush })),
}));

jest.mock('../../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../../context/FavouritesContext', () => ({
  useFavourites: jest.fn(),
}));

const mockToggle = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  useFavourites.mockReturnValue({ isFavourite: () => false, toggleFavourite: mockToggle });
});

describe('FavouriteButton', () => {
  it('renders a button', () => {
    useAuth.mockReturnValue({ user: null });
    render(<FavouriteButton propertyId="prop-1" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has aria-label "Add to favourites" when not favourited', () => {
    useAuth.mockReturnValue({ user: null });
    render(<FavouriteButton propertyId="prop-1" />);
    expect(screen.getByRole('button', { name: /add to favourites/i })).toBeInTheDocument();
  });

  it('redirects to /login when an unauthenticated user clicks', () => {
    useAuth.mockReturnValue({ user: null });
    render(<FavouriteButton propertyId="prop-1" />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockPush).toHaveBeenCalledWith('/login');
    expect(mockToggle).not.toHaveBeenCalled();
  });

  it('calls toggleFavourite when an authenticated user clicks', () => {
    useAuth.mockReturnValue({ user: { uid: 'u1', email: 'test@test.com' } });
    render(<FavouriteButton propertyId="prop-1" />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockToggle).toHaveBeenCalledWith('prop-1');
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('has aria-label "Remove from favourites" when already favourited', () => {
    useAuth.mockReturnValue({ user: { uid: 'u1' } });
    useFavourites.mockReturnValue({ isFavourite: () => true, toggleFavourite: mockToggle });
    render(<FavouriteButton propertyId="prop-1" />);
    expect(screen.getByRole('button', { name: /remove from favourites/i })).toBeInTheDocument();
  });

  it('applies an extra className to the button', () => {
    useAuth.mockReturnValue({ user: null });
    render(<FavouriteButton propertyId="prop-1" className="z-10 absolute" />);
    expect(screen.getByRole('button')).toHaveClass('z-10', 'absolute');
  });
});
