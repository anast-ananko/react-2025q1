import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Paginator from '.';

describe('Paginator', () => {
  it('should disable the "Previous" button if there is no previous page', () => {
    render(
      <MemoryRouter>
        <Paginator hasNext={true} hasPrev={false} />
      </MemoryRouter>
    );

    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeTruthy();
  });

  it('should disable the "Next" button if there is no next page', () => {
    render(
      <MemoryRouter>
        <Paginator hasNext={false} hasPrev={true} />
      </MemoryRouter>
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeTruthy();
  });
});
