import { saveAs } from 'file-saver';

import { store } from '../store';
import { rickandmortyApi } from '../store/services/rickandmortyApi';
import { Character } from '../types/apiTypes';

export const downloadCsv = async (
  selectedCharacterIds: number[]
): Promise<void> => {
  if (selectedCharacterIds.length === 0) return;

  try {
    const charactersData = await Promise.all(
      selectedCharacterIds.map(async (id) => {
        const response = await store.dispatch(
          rickandmortyApi.endpoints.getCharacter.initiate(id)
        );
        return response.data;
      })
    );

    if (charactersData.length === 0) {
      alert('Failed to load data');
      return;
    }

    const headers = ['Name', 'Species', 'Status', 'Gender', 'Url'];
    const csvRows = [
      headers.join(','),
      ...charactersData
        .filter((char): char is Character => Boolean(char))
        .map((char) =>
          [
            `"${char.name}"`,
            `"${char.species}"`,
            `"${char.status}"`,
            `"${char.gender}"`,
            `"https://rickandmortyapi.com/character/${char.id}"`,
          ].join(',')
        ),
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

    const fileName = `${charactersData.length}_characters.csv`;
    saveAs(blob, fileName);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error loading data:', error.message);
    }
  }
};
