jest.mock('next/dynamic', () => (_importFn, { loading: Loading }) => Loading);

import { render, screen } from '@testing-library/react';
const DynamicPropertyMap = require('../../DynamicPropertyMap').default;

describe('DynamicPropertyMap', () => {
  it('renders the loading state', () => {
    render(<DynamicPropertyMap />);
    expect(screen.getByText(/Loading Map/i)).toBeInTheDocument();
  });
});
