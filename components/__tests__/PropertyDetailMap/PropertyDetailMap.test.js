import { render, screen } from '@testing-library/react';
import PropertyDetailMap from '../../PropertyDetailMap';

jest.mock('@react-google-maps/api', () => ({
  useJsApiLoader: jest.fn(() => ({ isLoaded: false })),
  GoogleMap: ({ children }) => <div data-testid="google-map">{children}</div>,
  Marker: () => <div data-testid="marker" />,
}));

describe('PropertyDetailMap', () => {
  it('renders nothing when location is not provided', () => {
    const { container } = render(<PropertyDetailMap location={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when location is missing lat/lng', () => {
    const { container } = render(<PropertyDetailMap location={{}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a loading skeleton before the map is ready', () => {
    const { container } = render(
      <PropertyDetailMap location={{ lat: 52.63, lng: 1.3 }} />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the GoogleMap once the API is loaded', () => {
    const { useJsApiLoader } = require('@react-google-maps/api');
    useJsApiLoader.mockReturnValue({ isLoaded: true });
    render(<PropertyDetailMap location={{ lat: 52.63, lng: 1.3 }} />);
    expect(screen.getByTestId('google-map')).toBeInTheDocument();
  });

  it('renders a Marker when the map is loaded', () => {
    const { useJsApiLoader } = require('@react-google-maps/api');
    useJsApiLoader.mockReturnValue({ isLoaded: true });
    render(<PropertyDetailMap location={{ lat: 52.63, lng: 1.3 }} />);
    expect(screen.getByTestId('marker')).toBeInTheDocument();
  });
});
