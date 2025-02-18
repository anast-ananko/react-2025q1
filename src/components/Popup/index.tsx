import { FC } from 'react';

import { resetSelected } from '../../store/features/selectedCardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { downloadCsv } from '../../utils/downloadCsv';

const Popup: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedCards } = useAppSelector((store) => store.selectedCards);

  const handleUnselectAll = (): void => {
    dispatch(resetSelected());
  };

  return (
    <>
      {selectedCards.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full px-24 bg-green-300 dark:bg-green-600 text-white p-4 flex justify-between items-center">
          <span className="text-black text-xl font-bold">
            {selectedCards.length} item(s) selected
          </span>
          <div>
            <button
              className="mr-4 bg-red-500 text-xl dark:text-gray-800 px-4 py-2 rounded-lg cursor-pointer"
              onClick={handleUnselectAll}
            >
              Unselect all
            </button>
            <a
              className="bg-blue-500 text-xl dark:text-gray-800 px-4 py-2 rounded-lg cursor-pointer"
              href={downloadCsv(selectedCards)}
            >
              Download
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
