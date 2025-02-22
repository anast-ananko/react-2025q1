import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Character } from '../../types/apiTypes';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

interface CharacterQueryParams {
  page: number;
  name?: string;
}

export const rickandmortyApi = createApi({
  reducerPath: 'rickandmortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query<
      {
        characters: Character[];
        pagesNumber: number;
        next: string | null;
        prev: string | null;
      },
      CharacterQueryParams
    >({
      query: (arg) => ({
        url: 'character',
        params: { ...arg },
      }),
      transformResponse: (response: {
        results: Character[];
        info: { pages: number; next: string | null; prev: string | null };
      }) => {
        const characters = response.results;
        const pagesNumber = response.info.pages;
        const next = response.info.next;
        const prev = response.info.prev;
        return { characters, pagesNumber, next, prev };
      },
    }),
    getCharacter: builder.query<Character, number>({
      query: (id) => ({
        url: `/character/${id}`,
      }),
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetCharacterQuery } =
  rickandmortyApi;
