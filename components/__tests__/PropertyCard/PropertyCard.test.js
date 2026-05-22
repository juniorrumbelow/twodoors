import { render, screen, fireEvent } from '@testing-library/react';
import PropertyCard from '../../PropertyCard';
import { useAuth } from '../../../context/AuthContext';
import { useFavourites } from '../../../context/FavouritesContext';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ push: mockPush })),
}));

jest.mock('next/link', () => ({ children, href, ...props }) => (
  <a href={href} {...props}>{children}</a>
));

jest.mock('next/image', () => ({ src, alt, fill, sizes, className }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} className={className} />
));

jest.mock('../../../context/AuthContext', () => ({
  useAuth: jest.fn(() => ({ user: null })),
}));

jest.mock('../../../context/FavouritesContext', () => ({
  useFavourites: jest.fn(() => ({ isFavourite: () => false, toggleFavourite: jest.fn() })),
}));

const baseProperty = {
  id: 'prop-1',
  price: 250000,
  title: 'Beautiful 3 Bed Semi-Detached',
  address: '10 Oak Lane, Norwich, NR1 1AA',
  bedrooms: 3,
  bathrooms: 2,
  mainImage: '/images/house.jpg',
  images: ['/images/house.jpg', '/images/house2.jpg'],
  isBoosted: false,
};

beforeEach(() => {
  mockPush.mockClear();
});

describe('PropertyCard', () => {
  it('renders the formatted price', () => {
    render(<PropertyCard property={baseProperty} />);
    expect(screen.getByText('£250,000')).toBeInTheDocument();
  });

  it('renders priceText when provided instead of price', () => {
    render(<PropertyCard property={{ ...baseProperty, priceText: 'Guide Price £250,000' }} />);
    expect(screen.getByText('Guide Price £250,000')).toBeInTheDocument();
  });

  it('renders the property title', () => {
    render(<PropertyCard property={baseProperty} />);
    expect(screen.getByText('Beautiful 3 Bed Semi-Detached')).toBeInTheDocument();
  });

  it('renders the address', () => {
    render(<PropertyCard property={baseProperty} />);
    expect(screen.getByText('10 Oak Lane, Norwich, NR1 1AA')).toBeInTheDocument();
  });

  it('renders plural beds and baths counts', () => {
    render(<PropertyCard property={baseProperty} />);
    expect(screen.getByText(/3.*Beds/)).toBeInTheDocument();
    expect(screen.getByText(/2.*Baths/)).toBeInTheDocument();
  });

  it('renders singular Bed and Bath for count of 1', () => {
    render(<PropertyCard property={{ ...baseProperty, bedrooms: 1, bathrooms: 1 }} />);
    expect(screen.getByText(/^1 Bed$/)).toBeInTheDocument();
    expect(screen.getByText(/^1 Bath$/)).toBeInTheDocument();
  });

  it('shows FEATURED badge when isBoosted is true', () => {
    render(<PropertyCard property={{ ...baseProperty, isBoosted: true }} />);
    expect(screen.getByText('FEATURED')).toBeInTheDocument();
  });

  it('does not show FEATURED badge when isBoosted is false', () => {
    render(<PropertyCard property={baseProperty} />);
    expect(screen.queryByText('FEATURED')).not.toBeInTheDocument();
  });

  it('navigates to the property detail page on click', () => {
    render(<PropertyCard property={baseProperty} />);
    fireEvent.click(screen.getByRole('link', { hidden: true }));
    // The outer div[role="link"] handles navigation
    const card = document.querySelector('[role="link"]');
    fireEvent.click(card);
    expect(mockPush).toHaveBeenCalledWith('/property/prop-1');
  });

  it('navigates via Enter keydown', () => {
    render(<PropertyCard property={baseProperty} />);
    const card = document.querySelector('[role="link"]');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(mockPush).toHaveBeenCalledWith('/property/prop-1');
  });

  it('calls onHover with property id on mouse enter', () => {
    const onHover = jest.fn();
    render(<PropertyCard property={baseProperty} onHover={onHover} />);
    const card = document.querySelector('[role="link"]');
    fireEvent.mouseEnter(card);
    expect(onHover).toHaveBeenCalledWith('prop-1');
  });

  it('calls onLeave on mouse leave', () => {
    const onLeave = jest.fn();
    render(<PropertyCard property={baseProperty} onLeave={onLeave} />);
    const card = document.querySelector('[role="link"]');
    fireEvent.mouseLeave(card);
    expect(onLeave).toHaveBeenCalled();
  });

  it('renders popup variant when isPopup is true', () => {
    render(<PropertyCard property={baseProperty} isPopup />);
    // Popup renders a Link instead of the div[role="link"]
    expect(document.querySelector('[role="link"]')).not.toBeInTheDocument();
    expect(screen.getByText('£250,000')).toBeInTheDocument();
  });

  it('renders close button in popup variant when onClose is provided', () => {
    const onClose = jest.fn();
    render(<PropertyCard property={baseProperty} isPopup onClose={onClose} />);
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
});
