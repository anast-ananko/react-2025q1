import { vi, type Mock } from 'vitest';

import { downloadCsv } from './downloadCsv';
import { mockCharacters } from '../__mocks__/mockCharacters';

test('should generate a CSV download link with correct data and filename', () => {
  const mockUrl = 'blob:http://localhost/fake-url';
  global.URL.createObjectURL = vi.fn().mockReturnValue(mockUrl);

  const expectedCsv =
    'Name,Species,Status,Gender,Url\n' +
    mockCharacters
      .map(
        (char) =>
          `"${char.name}","${char.species}","${char.status}","${char.gender}","https://rickandmortyapi.com/character/${char.id}"`
      )
      .join('\n');

  const { url, fileName } = downloadCsv(mockCharacters);

  expect(url).toBe(mockUrl);
  expect(fileName).toBe(`${mockCharacters.length}_characters.csv`);

  const blobArg = (URL.createObjectURL as Mock).mock.calls[0][0] as Blob;
  expect(blobArg).toBeInstanceOf(Blob);
  expect(blobArg.size).toBe(new Blob([expectedCsv]).size);
  expect(blobArg.type).toBe('text/csv;charset=utf-8');
});
