// next/dynamic must be mocked before importing the component
jest.mock('next/dynamic', () => (_importFn, { loading: Loading }) => Loading);

import { render, screen } from '@testing-library/react';
const DynamicMap = require('../../DynamicMap').default;

describe('DynamicMap', () => {
  it('renders the loading state', () => {
    render(<DynamicMap />);
    expect(screen.getByText(/Loading Map/i)).toBeInTheDocument();
  });
});
