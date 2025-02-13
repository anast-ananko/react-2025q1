import { FC } from 'react';

import { Character } from '../../types/apiTypes';
import Card from '../Card';

interface CardListProps {
  characters: Character[];
}

const CardList: FC<CardListProps> = ({ characters }) => {
  return (
    <>
      {characters.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500 text-lg font-semibold">
          Not found
        </div>
      ) : (
        <div className="grid grid-cols-1 px-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8">
          {characters.map((character) => (
            <Card key={character.id} character={character} />
          ))}
        </div>
      )}
    </>
  );
};

export default CardList;
