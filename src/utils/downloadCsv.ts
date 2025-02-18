import { Character } from '../types/apiTypes';

export const downloadCsv = (selectedCards: Character[]) => {
  const headers = ['Name', 'Species', 'Status', 'Gender', 'Url'];
  const csvRows = [
    headers.join(','),
    ...selectedCards
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

  const url = URL.createObjectURL(blob);

  return url;
};
