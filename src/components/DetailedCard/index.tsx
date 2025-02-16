import { FC, useRef } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';

import Spinner from '../Spinner';
import { statusStyles } from '../../utils/styles';
import { useGetCharacterQuery } from '../../store/services/rickandmortyApi';

const DetailedCard: FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: character,
    isSuccess,
    isLoading,
    isFetching,
    isError,
  } = useGetCharacterQuery(Number(id));

  const detailsRef = useRef(null);

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = (): void => {
    navigate(`/${location.search}`);
  };

  const handleClickOutside = (): void => {
    const params = new URLSearchParams(searchParams);
    navigate(
      `/?page=${params.get('page') || '1'}${params.has('query') ? `&query=${params.get('query')}` : ''}`,
      { replace: true }
    );
  };

  useOnClickOutside(detailsRef, handleClickOutside);

  return id ? (
    <div
      ref={detailsRef}
      className="sticky top-10 right-0 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-xl border border-green-600 sm:w-[200px] md:w-80 h-fit z-50"
    >
      {(isLoading || isFetching) && <Spinner />}

      {isError && <div>Error</div>}

      {isSuccess && character && !isLoading && !isFetching && (
        <>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-xl bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-all ease-in-out cursor-pointer"
          >
            ❌
          </button>

          <div className="text-center mb-6">
            <img
              src={character.image}
              alt={character.name}
              className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-gray-300 shadow-md"
            />
            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              {character.name}
            </h2>
          </div>

          <div className="space-y-3 text-lg">
            <p className={`font-semibold ${statusStyles[character.status]}`}>
              Status: {character.status}
            </p>
            <p className="font-semibold text-gray-700 dark:text-gray-100">
              Species: {character.species}
            </p>
            <p
              className={`font-semibold ${character.gender === 'Female' ? 'text-pink-500' : character.gender === 'Male' ? 'text-blue-500' : character.gender === 'Genderless' ? 'text-purple-500' : 'text-gray-500'}`}
            >
              Gender: {character.gender}
            </p>
            <p className="font-semibold text-gray-700 dark:text-gray-100">
              Origin: {character.origin.name}
            </p>
            <p className="font-semibold text-gray-700 dark:text-gray-100">
              Location: {character.location.name}
            </p>
          </div>
        </>
      )}
    </div>
  ) : null;
};

export default DetailedCard;
