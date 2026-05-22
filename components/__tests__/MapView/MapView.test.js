import { render, screen } from '@testing-library/react';
import MapView from '../../MapView';

jest.mock('@react-google-maps/api', () => ({
  useJsApiLoader: jest.fn(() => ({ isLoaded: false })),
  GoogleMap: ({ children }) => <div data-testid="google-map">{children}</div>,
  Marker: () => <div data-testid="marker" />,
  InfoWindow: ({ children }) => <div data-testid="info-window">{children}</div>,
}));

describe('MapView', () => {
  it('renders a loading skeleton when the map is not yet loaded', () => {
    const { container } = render(<MapView entities={[]} location={null} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the GoogleMap once the API is loaded', () => {
    const { useJsApiLoader } = require('@react-google-maps/api');
    useJsApiLoader.mockReturnValue({ isLoaded: true });
    render(<MapView entities={[]} location={{ lat: 52.63, lng: 1.3 }} />);
    expect(screen.getByTestId('google-map')).toBeInTheDocument();
  });

  it('renders a Marker for each entity with a valid geometry', () => {
    const { useJsApiLoader } = require('@react-google-maps/api');
    useJsApiLoader.mockReturnValue({ isLoaded: true });
    const entities = [
      { entity: '1', geometry: 'POINT (-0.1 51.5)', notes: 'Dev A' },
      { entity: '2', geometry: 'POINT (-0.2 51.6)', notes: 'Dev B' },
    ];
    render(<MapView entities={entities} location={{ lat: 52.63, lng: 1.3 }} />);
    expect(screen.getAllByTestId('marker').length).toBe(2);
  });
});
