import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PlanningSearch from '../../PlanningSearch';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/planning',
    query: {},
    push: mockPush,
    isReady: true,
  })),
}));

jest.mock('../../DynamicMap', () => () => <div data-testid="dynamic-map">Map</div>);

jest.mock('../../../utils/locations', () => ({
  UNIQUE_UK_LOCATIONS: ['Norwich', 'London', 'Bristol', 'Norfolk'],
}));

beforeEach(() => {
  global.fetch = jest.fn();
  mockPush.mockClear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('PlanningSearch', () => {
  it('renders the search input', () => {
    render(<PlanningSearch />);
    expect(
      screen.getByPlaceholderText(/Search location or postcode/i),
    ).toBeInTheDocument();
  });

  it('renders the Search submit button', () => {
    render(<PlanningSearch />);
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  it('shows location suggestions when typing', () => {
    render(<PlanningSearch />);
    const input = screen.getByPlaceholderText(/Search location or postcode/i);
    fireEvent.change(input, { target: { value: 'Nor' } });
    fireEvent.focus(input);
    expect(screen.getByText('Norwich')).toBeInTheDocument();
    expect(screen.getByText('Norfolk')).toBeInTheDocument();
  });

  it('shows a loading spinner during a search', async () => {
    global.fetch.mockReturnValue(new Promise(() => {}));
    render(<PlanningSearch />);
    const input = screen.getByPlaceholderText(/Search location or postcode/i);
    fireEvent.change(input, { target: { value: 'Norwich' } });
    fireEvent.submit(input.closest('form'));
    await waitFor(() =>
      expect(screen.getByText(/Searching/i)).toBeInTheDocument(),
    );
  });

  it('displays an error when the API responds with an error', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Location not found' }),
    });
    render(<PlanningSearch />);
    const input = screen.getByPlaceholderText(/Search location or postcode/i);
    fireEvent.change(input, { target: { value: 'XYZ99' } });
    fireEvent.submit(input.closest('form'));
    await waitFor(() =>
      expect(screen.getByText(/Location not found/i)).toBeInTheDocument(),
    );
  });

  it('renders results after a successful search', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          location: { name: 'NR1', admin_district: 'Norwich', lat: 52.63, lng: 1.3 },
          entities: [
            {
              entity: '1',
              notes: 'New housing development on Test Road',
              dataset: 'planning-application',
              'entry-date': '2024-01-01',
            },
          ],
        }),
    });
    render(<PlanningSearch />);
    const input = screen.getByPlaceholderText(/Search location or postcode/i);
    fireEvent.change(input, { target: { value: 'NR1' } });
    fireEvent.submit(input.closest('form'));
    await waitFor(() =>
      expect(screen.getByText('New housing development on Test Road')).toBeInTheDocument(),
    );
  });

  it('shows "No planned development found" when entities is empty', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          location: { name: 'NR1', admin_district: 'Norwich', lat: 52.63, lng: 1.3 },
          entities: [],
        }),
    });
    render(<PlanningSearch />);
    const input = screen.getByPlaceholderText(/Search location or postcode/i);
    fireEvent.change(input, { target: { value: 'NR1' } });
    fireEvent.submit(input.closest('form'));
    await waitFor(() =>
      expect(screen.getByText(/No planned development found/i)).toBeInTheDocument(),
    );
  });

  it('does not submit when the search input is empty', () => {
    render(<PlanningSearch />);
    fireEvent.submit(
      screen.getByPlaceholderText(/Search location or postcode/i).closest('form'),
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
