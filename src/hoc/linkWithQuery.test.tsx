import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import LinkWithQuery from './linkWithQuery.tsx';

describe('linkWithQuery', () => {
  it('renders link with correct destination without existing query', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <LinkWithQuery to="/about">About</LinkWithQuery>
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /about/i });
    expect(link).toHaveAttribute('href', '/about');
  });

  it('navigates correctly when link is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/home?page=1']}>
        <Routes>
          <Route
            path="/home"
            element={<LinkWithQuery to="/about">About</LinkWithQuery>}
          />
          <Route path="/about" element={<h1>About Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /about/i });
    fireEvent.click(link);

    expect(await screen.findByText(/about page/i)).toBeInTheDocument();
  });
});
