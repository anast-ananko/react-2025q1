import { render, screen } from '@testing-library/react';

import Search from '.';

describe('Search', () => {
  it('should render input and search button', () => {
    render(<Search query="" onQueryChange={() => {}} onSubmit={() => {}} />);

    expect(screen.getByPlaceholderText('Search...')).toBeTruthy();
    expect(screen.getByRole('button', { name: /search/i })).toBeTruthy();
  });
});
