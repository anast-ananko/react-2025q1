import { FC } from 'react';

import { Character } from '../../types/apiTypes';
import LinkWithQuery from '../../hoc/linkWithQuery';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { toggleSelected } from '../../store/features/selectedCardsSlice';

interface CardProps {
  character: Character;
}

const Card: FC<CardProps> = ({ character }) => {
  const dispatch = useAppDispatch();
  const { selectedCards } = useAppSelector((store) => store.selectedCards);

  const isSelected = selectedCards.some((item) => item.id === character.id);

  const handleCheckboxChange = (): void => {
    dispatch(toggleSelected(character));
  };

  return (
    <div
      className="card bg-white dark:bg-gray-700 p-4 border border-green-600 rounded-lg shadow-lg max-w-sm mx-auto"
      data-testid="card"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          className="mr-2 scale-150 accent-green-600"
        />
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-40 object-contain rounded-t-lg"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800 text-center">
          {character.name}
        </h3>
      </div>

      <div className="mt-4 text-center">
        <LinkWithQuery
          to={`/details/${character.id}`}
          className="inline-block px-4 py-2 bg-green-600 text-white dark:text-gray-800 text-xl rounded-lg hover:bg-green-800 transition"
        >
          More
        </LinkWithQuery>
      </div>
    </div>
  );
};

export default Card;
