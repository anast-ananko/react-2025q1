import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router';

import { Character } from '../../types/apiTypes';
import CardList from '.';

const characters: Character[] = [
  {
    id: 1,
    name: 'Character 1',
    status: 'Alive',
    species: 'Human',
    type: 'Type 1',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'image1.jpg',
    episode: ['episode1'],
    url: 'url1',
    created: '2022-01-01',
  },
  {
    id: 2,
    name: 'Character 2',
    status: 'Dead',
    species: 'Alien',
    type: 'Type 2',
    gender: 'Female',
    origin: { name: 'Mars', url: '' },
    location: { name: 'Mars', url: '' },
    image: 'image2.jpg',
    episode: ['episode2'],
    url: 'url2',
    created: '2022-02-01',
  },
];

describe('CardList Component', () => {
  test('renders the correct number of cards', () => {
    render(
      <MemoryRouter>
        <CardList characters={characters} />
      </MemoryRouter>
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(characters.length);
  });

  test('displays a message when no cards are present', async () => {
    render(
      <MemoryRouter>
        <CardList characters={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText(/not found/i)).toBeTruthy();
  });
});
