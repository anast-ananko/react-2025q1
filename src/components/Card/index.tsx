import { FC } from 'react';
import { Link, useSearchParams } from 'react-router';

import { Character } from '../../types/apiTypes';

interface CardProps {
  character: Character;
}

const Card: FC<CardProps> = ({ character }) => {
  const [searchParams] = useSearchParams();

  const updatedSearchParams = new URLSearchParams(searchParams);
  updatedSearchParams.set('details', character.id.toString());

  const detailsLink = `/details/${character.id}?${updatedSearchParams.toString()}`;

  return (
    <Link
      to={detailsLink}
      className="card bg-white p-4 border border-green-600 rounded-lg shadow-lg max-w-sm mx-auto"
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
    </Link>
  );
};

export default Card;
