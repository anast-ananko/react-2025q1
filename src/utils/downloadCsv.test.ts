import { vi, type Mock } from 'vitest';

import { downloadCsv } from './downloadCsv';
import { mockCharacters } from '../__mocks__/mockCharacters';

test('should generate a CSV download link with correct data', () => {
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

  const resultUrl = downloadCsv(mockCharacters);
  expect(resultUrl).toBe(mockUrl);

  const blobArg = (URL.createObjectURL as Mock).mock.calls[0][0] as Blob;
  expect(blobArg).toBeInstanceOf(Blob);

  expect(blobArg.size).toBe(new Blob([expectedCsv]).size);
  expect(blobArg.type).toBe('text/csv;charset=utf-8');
});
