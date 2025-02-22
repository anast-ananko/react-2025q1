import { render, screen, fireEvent } from '@testing-library/react';
import { vi, type Mock } from 'vitest';
import { useSearchParams } from 'react-router-dom';

import Paginator from '.';

vi.mock('../../hooks/hook', () => ({
  useAppDispatch: vi.fn().mockReturnValue(vi.fn()),
  useAppSelector: vi.fn().mockReturnValue({ page: 2 }),
}));

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
}));

describe('Paginator component', () => {
  const dispatchMock = vi.fn();
  const setSearchParamsMock = vi.fn();

  beforeEach(() => {
    (useSearchParams as unknown as Mock).mockReturnValue([
      new URLSearchParams(),
      setSearchParamsMock,
    ]);
    vi.clearAllMocks();
  });

  it('should render current and total pages', () => {
    render(<Paginator pagesNumber={5} hasNext={true} hasPrev={true} />);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should disable "Previous" button if hasPrev is false', () => {
    render(<Paginator pagesNumber={5} hasNext={true} hasPrev={false} />);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it('should disable "Next" button if hasNext is false', () => {
    render(<Paginator pagesNumber={5} hasNext={false} hasPrev={true} />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('should call setPage and setSearchParams when "Next" is clicked', () => {
    render(<Paginator pagesNumber={5} hasNext={true} hasPrev={true} />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    expect.objectContaining({ type: 'ui/setPage', payload: 3 });
    expect(setSearchParamsMock).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should call setPage and setSearchParams when "Previous" is clicked', () => {
    render(<Paginator pagesNumber={5} hasNext={true} hasPrev={true} />);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(prevButton);

    expect.objectContaining({ type: 'ui/setPage', payload: 1 });
    expect(setSearchParamsMock).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should not call setPage if buttons are disabled', () => {
    render(<Paginator pagesNumber={5} hasNext={false} hasPrev={false} />);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    fireEvent.click(prevButton);
    fireEvent.click(nextButton);

    expect(dispatchMock).not.toHaveBeenCalled();
    expect(setSearchParamsMock).not.toHaveBeenCalled();
  });
});
