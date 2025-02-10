import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { Character } from '../../types/apiTypes';
import Card from '.';

const character: Character = {
  id: 1,
  name: 'Rick Sanchez',
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
};

describe('Card component', () => {
  test('renders the correct character data', () => {
    render(
      <MemoryRouter>
        <Card key={character.id} character={character} />
      </MemoryRouter>
    );

    expect(screen.getByText(character.name)).toBeTruthy();

    const imgElement = screen.getByRole('img', { name: character.name });

    expect(imgElement).toBeTruthy();
  });

  test('navigates to the detailed card page when clicked', async () => {
    render(
      <MemoryRouter>
        <Card key={character.id} character={character} />
      </MemoryRouter>
    );

    expect(screen.findByRole('link', { name: /character 1/i })).toBeTruthy();
  });
});
