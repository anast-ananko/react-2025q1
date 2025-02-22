import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: FC = () => {
  const navigate = useNavigate();

  const handleGoHome = (): void => {
    navigate('/');
  };

  return (
    <div className="flex flex-col pt-20 items-center justify-center text-xl font-semibold text-gray-500">
      <p>Not Found</p>
      <button
        onClick={handleGoHome}
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
      >
        Go to Home
      </button>
    </div>
  );
};
export default NotFound;
