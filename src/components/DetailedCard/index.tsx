import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Character } from '../../types/apiTypes';
import { fetchCharacterDetails } from '../../services/api';
import { statusStyles } from '../../utils/styles';
import { updateSearchParams } from '../../utils/updateSearchParams';
import Spinner from '../Spinner';

const DetailedCard: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();

  const [characterDetails, setCharacterDetails] = useState<Character | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchDetails = useCallback(async () => {
    if (!id) return;

    setLoading(true);

    try {
      const details = await fetchCharacterDetails(id);

      setCharacterDetails(details);
    } catch {
      throw new Error('Error fetching character details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams);
    if (id) currentParams.set('details', id.toString());

    const newUrl = `/?${currentParams.toString()}`;
    window.history.pushState({}, '', newUrl);

    fetchDetails();
  }, [id, searchParams, setSearchParams, fetchDetails]);

  const handleClose = () => {
    updateSearchParams(searchParams, navigate);
  };

  if (loading) {
    return <Spinner />;
  }

  return characterDetails ? (
    <div className="relative max-w-sm mx-auto bg-white p-6 rounded-lg shadow-xl border border-gray-200">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-xl bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-all ease-in-out cursor-pointer"
      >
        ❌
      </button>

      <div className="text-center mb-6">
        <img
          src={characterDetails.image}
          alt={characterDetails.name}
          className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-gray-300 shadow-md"
        />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          {characterDetails.name}
        </h2>
      </div>

      <div className="space-y-3 text-lg">
        <p className={`font-semibold ${statusStyles[characterDetails.status]}`}>
          Status: {characterDetails.status}
        </p>
        <p className="font-semibold text-gray-700">
          Species: {characterDetails.species}
        </p>

        <p
          className={`font-semibold ${
            characterDetails.gender === 'Female'
              ? 'text-pink-500'
              : characterDetails.gender === 'Male'
                ? 'text-blue-500'
                : characterDetails.gender === 'Genderless'
                  ? 'text-purple-500'
                  : 'text-gray-500'
          }`}
        >
          Gender: {characterDetails.gender}
        </p>

        <p className="font-semibold text-gray-700">
          Origin: {characterDetails.origin.name}
        </p>
        <p className="font-semibold text-gray-700">
          Location: {characterDetails.location.name}
        </p>
      </div>
    </div>
  ) : null;
};

export default DetailedCard;
