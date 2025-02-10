import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NotFound from '.';

describe('NotFound', () => {
  it('should render "Not Found" text and "Go to Home" button', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('Not Found')).toBeTruthy();
    expect(screen.getByRole('button', { name: /go to home/i })).toBeTruthy();
  });
});
