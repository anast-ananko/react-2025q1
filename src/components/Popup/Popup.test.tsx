import { render, screen, fireEvent } from '@testing-library/react';
import { vi, type Mock } from 'vitest';

import Popup from '.';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { resetSelected } from '../../store/features/selectedCardsSlice';
import { downloadCsv } from '../../utils/downloadCsv';

vi.mock('../../hooks/hook', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn().mockReturnValue({ selectedCards: [] }),
}));

vi.mock('../../utils/downloadCsv', () => ({
  downloadCsv: vi.fn().mockReturnValue('/mock/path/to/csv'),
}));

describe('Popup component', () => {
  const mockDispatch = vi.fn();
  const selectedMock = [{ id: 1, name: 'Rick', image: 'rick.png' }];

  beforeEach(() => {
    (useAppDispatch as unknown as Mock).mockReturnValue(mockDispatch);
  });

  it('should not render when no cards are selected', () => {
    render(<Popup />);

    expect(screen.queryByText(/item\(s\) selected/i)).not.toBeInTheDocument();
  });

  it('should render when cards are selected', () => {
    (useAppSelector as unknown as Mock).mockReturnValue({
      selectedCards: selectedMock,
    });

    render(<Popup />);

    expect(screen.getByText('1 item(s) selected')).toBeInTheDocument();
    expect(screen.getByText(/unselect all/i)).toBeInTheDocument();
    expect(screen.getByText(/download/i)).toBeInTheDocument();
  });

  it('should dispatch resetSelected when "Unselect all" is clicked', () => {
    (useAppSelector as unknown as Mock).mockReturnValue({
      selectedCards: selectedMock,
    });

    render(<Popup />);

    fireEvent.click(screen.getByText(/unselect all/i));

    expect(mockDispatch).toHaveBeenCalledWith(resetSelected());
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should call downloadCsv and set correct href for download link', () => {
    (useAppSelector as unknown as Mock).mockReturnValue({
      selectedCards: selectedMock,
    });

    render(<Popup />);

    const downloadLink = screen.getByText(/download/i);
    expect(downloadCsv).toHaveBeenCalledWith(selectedMock);
    expect(downloadLink.getAttribute('href')).toBe('/mock/path/to/csv');
  });
});
