import { LoaderFunctionArgs } from 'react-router-dom';

import { fetchCharacters } from '../services/api';
import { ApiResponse } from '../types/apiTypes';

export interface CharactersLoader {
  data: Promise<ApiResponse>;
}

export async function charactersLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || '';
  const page = Number(url.searchParams.get('page')) || 1;

  const data = fetchCharacters(query, page);

  return { data };
}
