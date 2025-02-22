import { render, screen, fireEvent } from '@testing-library/react';
import { vi, type Mock } from 'vitest';

import Card from '.';
import { toggleSelected } from '../../store/features/selectedCardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { mockCharacter } from '../../__mocks__/mockCharacter';

vi.mock('../../hooks/hook', () => ({
  useAppDispatch: vi.fn().mockReturnValue(vi.fn()),
  useAppSelector: vi.fn().mockReturnValue({ selectedCards: [] }),
}));

vi.mock('../../hoc/linkWithQuery', () => ({
  default: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('Card component', () => {
  it('should render character name and image', () => {
    render(<Card character={mockCharacter} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute(
      'src',
      mockCharacter.image
    );
  });

  it('should dispatch toggleSelected when checkbox is clicked', () => {
    const dispatchMock = vi.fn();
    (useAppDispatch as unknown as Mock).mockReturnValue(dispatchMock);

    render(<Card character={mockCharacter} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(dispatchMock).toHaveBeenCalledWith(toggleSelected(mockCharacter));
  });

  it('should check the checkbox if character is selected', () => {
    (useAppSelector as unknown as Mock).mockReturnValue({
      selectedCards: [{ id: 1 }],
    });

    render(<Card character={mockCharacter} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('should render the link with correct href', () => {
    render(<Card character={mockCharacter} />);

    const link = screen.getByRole('link', { name: /more/i });
    expect(link).toHaveAttribute('href', '/details/1');
  });
});
