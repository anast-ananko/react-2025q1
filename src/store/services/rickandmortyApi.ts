import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character } from '../../types/apiTypes';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

interface CharacterQueryParams {
  page: number;
  query: string;
}

export const rickandmortyApi = createApi({
  reducerPath: 'rickandmortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query<Character, CharacterQueryParams>({
      query: (arg) => ({
        url: 'character',
        params: { ...arg },
      }),
    }),
    getCharacter: builder.query<Character, number>({
      query: (id) => ({
        url: `/character/${id}`,
      }),
    }),
  }),
});

export const { useGetAllCharactersQuery, useLazyGetCharacterQuery } =
  rickandmortyApi;
