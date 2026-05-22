jest.mock('next/dynamic', () => (_importFn, { loading: Loading }) => Loading);

import { render, screen } from '@testing-library/react';
const DynamicPropertyDetailMap = require('../../DynamicPropertyDetailMap').default;

describe('DynamicPropertyDetailMap', () => {
  it('renders the loading state', () => {
    render(<DynamicPropertyDetailMap />);
    expect(screen.getByText(/Loading Map/i)).toBeInTheDocument();
  });
});
