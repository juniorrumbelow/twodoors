import { render, screen } from '@testing-library/react';
import PropertyMap from '../../PropertyMap';
import { useAuth } from '../../../context/AuthContext';
import { useFavourites } from '../../../context/FavouritesContext';

jest.mock('@react-google-maps/api', () => ({
  useJsApiLoader: jest.fn(() => ({ isLoaded: false })),
  GoogleMap: ({ children }) => <div data-testid="google-map">{children}</div>,
  OverlayView: ({ children }) => <div data-testid="overlay-view">{children}</div>,
  InfoWindow: ({ children }) => <div data-testid="info-window">{children}</div>,
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn(), pathname: '/', query: {} })),
}));

jest.mock('next/link', () => ({ children, href, ...props }) => (
  <a href={href} {...props}>{children}</a>
));

jest.mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />);

jest.mock('../../../context/AuthContext', () => ({
  useAuth: jest.fn(() => ({ user: null })),
}));

jest.mock('../../../context/FavouritesContext', () => ({
  useFavourites: jest.fn(() => ({ isFavourite: () => false, toggleFavourite: jest.fn() })),
}));

const properties = [
  {
    id: 'p1',
    price: 200000,
    title: 'House 1',
    address: 'Addr 1',
    bedrooms: 2,
    bathrooms: 1,
    mainImage: '/img.jpg',
    images: [],
    location: { lat: 52.63, lng: 1.3 },
  },
];

describe('PropertyMap', () => {
  it('renders a loading skeleton when the map is not yet loaded', () => {
    const { container } = render(<PropertyMap properties={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the GoogleMap once loaded', () => {
    const { useJsApiLoader } = require('@react-google-maps/api');
    useJsApiLoader.mockReturnValue({ isLoaded: true });
    render(<PropertyMap properties={properties} highlightedId={null} />);
    expect(screen.getByTestId('google-map')).toBeInTheDocument();
  });

  it('renders an overlay for each property when loaded', () => {
    const { useJsApiLoader } = require('@react-google-maps/api');
    useJsApiLoader.mockReturnValue({ isLoaded: true });
    render(<PropertyMap properties={properties} highlightedId={null} />);
    expect(screen.getAllByTestId('overlay-view').length).toBe(properties.length);
  });
});
