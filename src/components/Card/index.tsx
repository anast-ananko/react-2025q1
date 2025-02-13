import { FC } from 'react';

import { Character } from '../../types/apiTypes';
import LinkWithQuery from '../../hok/linkWithQuery';

interface CardProps {
  character: Character;
}

const Card: FC<CardProps> = ({ character }) => {
  return (
    <LinkWithQuery
      to={`/details/${character.id}`}
      className="card bg-white p-4 border border-green-600 rounded-lg shadow-lg max-w-sm mx-auto"
      data-testid="card"
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-40 object-contain rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {character.name}
        </h3>
      </div>
    </LinkWithQuery>
  );
};

export default Card;
