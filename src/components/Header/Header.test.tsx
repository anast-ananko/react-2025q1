import { fireEvent, render, screen } from '@testing-library/react';
import { vi, type Mock } from 'vitest';

import Header from '.';
import { useTheme } from '../../context/useTheme';

vi.mock('../../components/Search', () => ({
  default: () => <div role="search">Search Mock</div>,
}));

vi.mock('../../context/useTheme', () => ({
  useTheme: vi.fn().mockReturnValue({
    theme: 'light',
    toggleTheme: vi.fn(),
  }),
}));

describe('Header component', () => {
  it('should render the Search component as a mock', () => {
    render(<Header />);

    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('should toggle theme when button is clicked', () => {
    const toggleThemeMock = vi.fn();
    (useTheme as Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: toggleThemeMock,
    });

    render(<Header />);

    const buttonDark = screen.getByText('🌙 Dark');
    fireEvent.click(buttonDark);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
