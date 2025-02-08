import { LoaderFunctionArgs } from 'react-router-dom';

import { fetchCharacters } from '../services/api';
import { Character } from '../types/apiTypes';

export interface CharactersLoader {
  characters: Character[];
}

export const charactersLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<{
  characters: Promise<Character[]>;
}> => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || '';

  const characters = fetchCharacters(query);

  return { characters };
};
