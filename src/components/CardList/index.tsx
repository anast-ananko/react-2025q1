import { FC } from 'react';

import { Card } from '../../components';
import { useAppSelector } from '../../hooks/hook';

const CardList: FC = () => {
  const { currentCards } = useAppSelector((store) => store.currentCards);

  return (
    <div className="grid grid-cols-1 px-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8">
      {currentCards.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CardList;
