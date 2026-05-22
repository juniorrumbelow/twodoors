import { render, screen, waitFor } from '@testing-library/react';
import PropertyPlanningSection from '../../PropertyPlanningSection';

jest.mock('next/link', () => ({ children, href, ...props }) => (
  <a href={href} {...props}>{children}</a>
));

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('PropertyPlanningSection', () => {
  it('renders nothing when the address contains no UK postcode', () => {
    const { container } = render(
      <PropertyPlanningSection address="Some street with no postcode" />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when address is undefined', () => {
    const { container } = render(<PropertyPlanningSection />);
    expect(container.firstChild).toBeNull();
  });

  it('shows a loading skeleton when fetching', () => {
    global.fetch.mockReturnValue(new Promise(() => {}));
    const { container } = render(
      <PropertyPlanningSection address="10 Oak St, Norwich NR1 1AA" />,
    );
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders planning applications after a successful fetch', async () => {
    global.fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          entities: [
            {
              notes: 'Erect 3 new dwellings',
              'address-text': '10 Test Rd, Norwich',
              'decision-date': '2024-01-15',
              dataset: 'planning-application',
            },
          ],
        }),
    });
    render(<PropertyPlanningSection address="10 Oak St, Norwich NR1 1AA" />);
    await waitFor(() =>
      expect(screen.getByText('Erect 3 new dwellings')).toBeInTheDocument(),
    );
    expect(screen.getByText('10 Test Rd, Norwich')).toBeInTheDocument();
  });

  it('shows an error state when the API returns an error', async () => {
    global.fetch.mockResolvedValue({
      json: () => Promise.resolve({ error: 'Not found' }),
    });
    render(<PropertyPlanningSection address="10 Oak St, Norwich NR1 1AA" />);
    await waitFor(() =>
      expect(screen.getByText(/Could not load planning data/i)).toBeInTheDocument(),
    );
  });

  it('shows an empty state when there are no planning entities', async () => {
    global.fetch.mockResolvedValue({
      json: () => Promise.resolve({ entities: [] }),
    });
    render(<PropertyPlanningSection address="10 Oak St, Norwich NR1 1AA" />);
    await waitFor(() =>
      expect(screen.getByText(/No planning applications found near/i)).toBeInTheDocument(),
    );
  });

  it('renders the "View all" link to /planning', () => {
    global.fetch.mockReturnValue(new Promise(() => {}));
    render(<PropertyPlanningSection address="10 Oak St, Norwich NR1 1AA" />);
    expect(screen.getByRole('link', { name: /View all/i })).toHaveAttribute('href', '/planning');
  });

  it('fetches using the extracted postcode', async () => {
    global.fetch.mockResolvedValue({ json: () => Promise.resolve({ entities: [] }) });
    render(<PropertyPlanningSection address="10 Oak St, Norwich NR1 1AA" />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('NR1%201AA'),
    );
  });
});
