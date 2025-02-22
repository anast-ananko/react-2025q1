import { render, screen } from '@testing-library/react';
import { vi, type Mock } from 'vitest';

import CardList from '.';
import { useAppSelector } from '../../hooks/hook';
import { Character } from '../../types/apiTypes';
import { mockCharacters } from '../../__mocks__/mockCharacters';

vi.mock('../../components', () => ({
  Card: ({ character }: { character: Character }) => (
    <div data-testid="card">{character.name}</div>
  ),
}));

vi.mock('../../hooks/hook', () => ({
  useAppSelector: vi.fn().mockReturnValue({ currentCards: [] }),
}));

describe('CardList component', () => {
  it('should render no cards if currentCards is empty', () => {
    render(<CardList />);

    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
  });

  it('should render the correct number of Card components', () => {
    (useAppSelector as unknown as Mock).mockReturnValue({
      currentCards: mockCharacters,
    });

    render(<CardList />);

    const renderedCards = screen.getAllByTestId('card');
    expect(renderedCards).toHaveLength(mockCharacters.length);
  });

  it('should display the correct character names', () => {
    (useAppSelector as unknown as Mock).mockReturnValue({
      currentCards: mockCharacters,
    });

    render(<CardList />);

    mockCharacters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
  });
});
