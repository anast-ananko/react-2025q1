import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { vi, type Mock } from 'vitest';

import Search from '.';
import { useAppDispatch } from '../../hooks/hook';
import { setQuery, setPage } from '../../store/features/uiStateSlice';
import { resetSelected } from '../../store/features/selectedCardsSlice';

vi.mock('../../hooks/hook', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn().mockReturnValue('test'),
}));

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn().mockReturnValue([new URLSearchParams(), vi.fn()]),
}));

describe('Search component', () => {
  it('should render the search input and button', () => {
    render(<Search />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should update searchQuery state on input change', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test query' } });

    expect(input.value).toBe('test query');
  });

  it('should dispatch setQuery, setPage, and resetSelected when form is submitted', async () => {
    const dispatchMock = vi.fn();
    (useAppDispatch as unknown as Mock).mockReturnValue(dispatchMock);

    render(<Search />);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'new query' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(setQuery('new query'));
      expect(dispatchMock).toHaveBeenCalledWith(setPage(1));
      expect(dispatchMock).toHaveBeenCalledWith(resetSelected());
    });
  });

  it('should set query parameter and page number in the URL when form is submitted', async () => {
    const setSearchParamsMock = vi.fn();
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams(),
      setSearchParamsMock,
    ]);

    render(<Search />);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(setSearchParamsMock).toHaveBeenCalledWith(expect.any(Function));

      const updateFunction = setSearchParamsMock.mock.calls[0][0];
      const params = updateFunction(new URLSearchParams());

      expect(params.get('page')).toBe('1');
      expect(params.get('query')).toBe('test query');
    });
  });
});
