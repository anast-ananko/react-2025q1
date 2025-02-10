import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import DetailedCard from '../DetailedCard';

describe('DetailedCard Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<DetailedCard />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it('shows loading spinner initially', () => {
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<DetailedCard />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeTruthy();
  });
});
