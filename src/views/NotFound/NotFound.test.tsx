import { render, screen, fireEvent } from '@testing-library/react';
import { vi, type Mock } from 'vitest';
import { useNavigate } from 'react-router-dom';

import NotFound from '.';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('NotFound component', () => {
  it('should render "Not Found" message', () => {
    render(<NotFound />);

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('should render "Go to Home" button', () => {
    render(<NotFound />);

    expect(
      screen.getByRole('button', { name: /go to home/i })
    ).toBeInTheDocument();
  });

  it('should navigate to home page when button is clicked', () => {
    const navigateMock = vi.fn();
    (useNavigate as unknown as Mock).mockReturnValue(navigateMock);

    render(<NotFound />);

    const button = screen.getByRole('button', { name: /go to home/i });
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith('/');
    expect(navigateMock).toHaveBeenCalledTimes(1);
  });
});
