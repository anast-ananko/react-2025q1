import { FC } from 'react';

import { Card } from '../../components';
import { Character } from '../../types/apiTypes';

interface CardListProps {
  characters: Character[];
}

const CardList: FC<CardListProps> = ({ characters }) => {
  return (
    <div className="grid grid-cols-1 px-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8">
      {characters.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CardList;
