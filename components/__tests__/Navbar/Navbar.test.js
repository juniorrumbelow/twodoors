import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../Navbar';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/router';

jest.mock('next/link', () => ({ children, href, onClick, ...props }) => (
  <a href={href} onClick={onClick} {...props}>{children}</a>
));

jest.mock('../../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../../utils/locations', () => ({
  UNIQUE_UK_LOCATIONS: ['Norwich', 'London', 'Bristol', 'Norfolk'],
}));

jest.mock('../../Logo', () => () => <div>Logo</div>);

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

function setupRouter(overrides = {}) {
  useRouter.mockReturnValue({
    pathname: '/',
    query: {},
    push: mockPush,
    ...overrides,
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  setupRouter();
});

describe('Navbar', () => {
  it('renders Buy and Rent navigation links', () => {
    useAuth.mockReturnValue({ user: null, isAgent: false, logout: jest.fn() });
    render(<Navbar />);
    expect(screen.getByRole('link', { name: 'Buy' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Rent' })).toBeInTheDocument();
  });

  it('renders a Login link when not authenticated', () => {
    useAuth.mockReturnValue({ user: null, isAgent: false, logout: jest.fn() });
    render(<Navbar />);
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
  });

  it('renders an Account button when authenticated', () => {
    useAuth.mockReturnValue({ user: { email: 'u@test.com' }, isAgent: false, logout: jest.fn() });
    render(<Navbar />);
    expect(screen.getAllByRole('button').some((b) => b.textContent.includes('Account'))).toBe(true);
  });

  it('shows Home Profile link for non-agent users', () => {
    useAuth.mockReturnValue({ user: null, isAgent: false, logout: jest.fn() });
    render(<Navbar />);
    const links = screen.getAllByRole('link', { name: /Home Profile/i });
    expect(links.length).toBeGreaterThan(0);
  });

  it('hides Home Profile link for agent users', () => {
    useAuth.mockReturnValue({ user: { email: 'agent@test.com' }, isAgent: true, logout: jest.fn() });
    render(<Navbar />);
    expect(screen.queryByRole('link', { name: /Home Profile/i })).not.toBeInTheDocument();
  });

  it('opens the dropdown and calls logout when Logout is clicked', () => {
    const mockLogout = jest.fn();
    useAuth.mockReturnValue({ user: { email: 'u@test.com' }, isAgent: false, logout: mockLogout });
    render(<Navbar />);
    // Open dropdown
    const accountBtn = screen.getAllByRole('button').find((b) => b.textContent.includes('Account'));
    fireEvent.click(accountBtn);
    fireEvent.click(screen.getByRole('button', { name: /Logout/i }));
    expect(mockLogout).toHaveBeenCalled();
  });

  it('shows agent-specific links (My Listings, Agency Profile) when agent is logged in', () => {
    useAuth.mockReturnValue({ user: { email: 'agent@test.com' }, isAgent: true, logout: jest.fn() });
    render(<Navbar />);
    const accountBtn = screen.getAllByRole('button').find((b) => b.textContent.includes('Account'));
    fireEvent.click(accountBtn);
    expect(screen.getByRole('link', { name: /My Listings/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Agency Profile/i })).toBeInTheDocument();
  });

  it('shows the search input on non-home pages', () => {
    setupRouter({ pathname: '/search', query: {} });
    useAuth.mockReturnValue({ user: null, isAgent: false, logout: jest.fn() });
    render(<Navbar />);
    const inputs = screen.getAllByPlaceholderText(/Search properties/i);
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('shows a Filters button on the search page', () => {
    setupRouter({ pathname: '/search', query: {} });
    useAuth.mockReturnValue({ user: null, isAgent: false, logout: jest.fn() });
    render(<Navbar />);
    expect(screen.getAllByRole('button', { name: /Filters/i }).length).toBeGreaterThan(0);
  });

  it('shows location suggestions when typing in the search box', () => {
    setupRouter({ pathname: '/search', query: {} });
    useAuth.mockReturnValue({ user: null, isAgent: false, logout: jest.fn() });
    render(<Navbar />);
    const input = screen.getAllByPlaceholderText(/Search properties/i)[0];
    fireEvent.change(input, { target: { value: 'Nor' } });
    expect(screen.getByText('Norwich')).toBeInTheDocument();
    expect(screen.getByText('Norfolk')).toBeInTheDocument();
  });

  it('submits the search form on Enter key', () => {
    setupRouter({ pathname: '/search', query: {} });
    useAuth.mockReturnValue({ user: null, isAgent: false, logout: jest.fn() });
    render(<Navbar />);
    const input = screen.getAllByPlaceholderText(/Search properties/i)[0];
    fireEvent.change(input, { target: { value: 'Norwich' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockPush).toHaveBeenCalled();
  });

  it('opens the filters modal when the Filters button is clicked on search page', () => {
    setupRouter({ pathname: '/search', query: {} });
    useAuth.mockReturnValue({ user: null, isAgent: false, logout: jest.fn() });
    render(<Navbar />);
    const filtersBtn = screen.getAllByRole('button', { name: /Filters/i })[0];
    fireEvent.click(filtersBtn);
    expect(screen.getByRole('heading', { name: /Filters/i })).toBeInTheDocument();
  });
});
