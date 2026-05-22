import { render, screen, waitFor } from '@testing-library/react';
import NearbyTransport from '../../NearbyTransport';

const location = { lat: 52.63, lng: 1.3 };

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('NearbyTransport', () => {
  it('renders nothing when no location is provided', () => {
    const { container } = render(<NearbyTransport location={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when location is missing lat/lng', () => {
    const { container } = render(<NearbyTransport location={{}} />);
    expect(container.firstChild).toBeNull();
  });

  it('shows the "Transport Links" heading while loading', () => {
    global.fetch.mockReturnValue(new Promise(() => {}));
    render(<NearbyTransport location={location} />);
    expect(screen.getByText('Transport Links')).toBeInTheDocument();
  });

  it('shows loading skeleton rows while fetching', () => {
    global.fetch.mockReturnValue(new Promise(() => {}));
    const { container } = render(<NearbyTransport location={location} />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders transport stops grouped by type after a successful fetch', async () => {
    global.fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          transport: [
            { name: 'Norwich Station', type: 'Train Station', distance: 800 },
            { name: 'Castle Meadow', type: 'Bus Stop', distance: 200 },
          ],
        }),
    });
    render(<NearbyTransport location={location} />);
    await waitFor(() => expect(screen.getByText('Norwich Station')).toBeInTheDocument());
    expect(screen.getByText('Castle Meadow')).toBeInTheDocument();
  });

  it('formats distances correctly', async () => {
    global.fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          transport: [
            { name: 'Stop A', type: 'Bus Stop', distance: 350 },
            { name: 'Station B', type: 'Train Station', distance: 1500 },
          ],
        }),
    });
    render(<NearbyTransport location={location} />);
    await waitFor(() => expect(screen.getByText('350 m')).toBeInTheDocument());
    expect(screen.getByText('1.5 km')).toBeInTheDocument();
  });

  it('shows an error message when the fetch fails', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));
    render(<NearbyTransport location={location} />);
    await waitFor(() =>
      expect(screen.getByText(/Could not load transport data/i)).toBeInTheDocument(),
    );
  });

  it('renders nothing when the transport array is empty', async () => {
    global.fetch.mockResolvedValue({ json: () => Promise.resolve({ transport: [] }) });
    const { container } = render(<NearbyTransport location={location} />);
    await waitFor(() => expect(container.firstChild).toBeNull());
  });

  it('fetches from the correct API endpoint', async () => {
    global.fetch.mockResolvedValue({ json: () => Promise.resolve({ transport: [] }) });
    render(<NearbyTransport location={location} />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/nearby?lat=${location.lat}&lng=${location.lng}&type=transport`,
    );
  });
});
