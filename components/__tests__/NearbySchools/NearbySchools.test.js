import { render, screen, waitFor } from '@testing-library/react';
import NearbySchools from '../../NearbySchools';

const location = { lat: 52.63, lng: 1.3 };

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('NearbySchools', () => {
  it('renders nothing when no location is provided', () => {
    const { container } = render(<NearbySchools location={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when location is missing lat/lng', () => {
    const { container } = render(<NearbySchools location={{}} />);
    expect(container.firstChild).toBeNull();
  });

  it('shows the "Nearby Schools" heading while loading', () => {
    global.fetch.mockReturnValue(new Promise(() => {}));
    render(<NearbySchools location={location} />);
    expect(screen.getByText('Nearby Schools')).toBeInTheDocument();
  });

  it('shows loading skeleton rows while fetching', () => {
    global.fetch.mockReturnValue(new Promise(() => {}));
    const { container } = render(<NearbySchools location={location} />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders school names and distances after a successful fetch', async () => {
    global.fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          schools: [
            { name: 'Norwich Primary', type: 'Primary', ofsted: 'Outstanding', distance: 500 },
            { name: 'City Academy', type: 'Secondary', ofsted: 'Good', distance: 1200 },
          ],
        }),
    });
    render(<NearbySchools location={location} />);
    await waitFor(() => expect(screen.getByText('Norwich Primary')).toBeInTheDocument());
    expect(screen.getByText('City Academy')).toBeInTheDocument();
    expect(screen.getByText('500 m')).toBeInTheDocument();
    expect(screen.getByText('1.2 km')).toBeInTheDocument();
  });

  it('shows Ofsted rating badges', async () => {
    global.fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          schools: [{ name: 'Test School', type: 'Primary', ofsted: 'Outstanding', distance: 300 }],
        }),
    });
    render(<NearbySchools location={location} />);
    await waitFor(() => expect(screen.getByText(/Ofsted: Outstanding/)).toBeInTheDocument());
  });

  it('shows an error message when the fetch fails', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));
    render(<NearbySchools location={location} />);
    await waitFor(() =>
      expect(screen.getByText(/Could not load schools data/i)).toBeInTheDocument(),
    );
  });

  it('renders nothing when the schools array is empty', async () => {
    global.fetch.mockResolvedValue({ json: () => Promise.resolve({ schools: [] }) });
    const { container } = render(<NearbySchools location={location} />);
    await waitFor(() => expect(container.firstChild).toBeNull());
  });

  it('fetches from the correct API endpoint', async () => {
    global.fetch.mockResolvedValue({
      json: () => Promise.resolve({ schools: [] }),
    });
    render(<NearbySchools location={location} />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/nearby?lat=${location.lat}&lng=${location.lng}&type=schools`,
    );
  });
});
