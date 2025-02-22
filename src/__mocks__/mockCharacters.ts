import { Character } from '../types/apiTypes';

export const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Earth (Replacement Dimension)', url: '' },
    image: 'https://example.com/rick.png',
    episode: ['https://example.com/episode/1'],
    url: 'https://example.com/character/1',
    created: '2017-11-04T18:48:46.250Z',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Earth (Replacement Dimension)', url: '' },
    image: 'https://example.com/morty.png',
    episode: ['https://example.com/episode/1'],
    url: 'https://example.com/character/2',
    created: '2017-11-04T18:50:21.651Z',
  },
];
