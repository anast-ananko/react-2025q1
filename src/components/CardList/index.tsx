import { FC } from 'react';

import { Character } from '../../types/apiTypes';
import Card from '../Card';

interface CardListProps {
  characters: Character[];
}

const CardList: FC<CardListProps> = ({ characters }) => {
  return (
    <div className="grid grid-cols-1 px-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-3 gap-y-8">
      {characters.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CardList;
