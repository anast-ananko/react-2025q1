import { render, screen } from '@testing-library/react';
import { vi, type Mock } from 'vitest';

import Home from '.';
import { useGetAllCharactersQuery } from '../../store/services/rickandmortyApi';
import { ThemeProvider } from '../../context/ThemeProvider';

vi.mock('../../store/services/rickandmortyApi', () => ({
  useGetAllCharactersQuery: vi.fn().mockReturnValue({
    data: {},
    isLoading: true,
    isFetching: false,
    isSuccess: false,
    error: null,
  }),
}));

vi.mock('../../hooks/hook', () => ({
  useAppDispatch: vi.fn().mockReturnValue(vi.fn()),
  useAppSelector: vi
    .fn()
    .mockReturnValue({ page: '1', query: 'test', selectedCards: [] }),
}));

vi.mock('react-router-dom', () => ({
  Outlet: () => <div>Outlet Mock</div>,
  useSearchParams: vi.fn().mockReturnValue([new URLSearchParams(), vi.fn()]),
}));

describe('Home component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/fake-url');
  });

  it('should display Spinner while loading', () => {
    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should display error message when an unknown error occurs', () => {
    (useGetAllCharactersQuery as Mock).mockReturnValue({
      error: { status: 404 },
      isLoading: false,
    });

    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );

    expect(screen.getByText(/Not found/i)).toBeInTheDocument();
  });
});
