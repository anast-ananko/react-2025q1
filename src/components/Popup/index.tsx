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

  const { url, fileName } = downloadCsv(selectedCards);

  return (
    <>
      {selectedCards.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full px-4 sm:px-10 lg:px-24 bg-green-300 dark:bg-green-600 text-white p-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <span className="text-black text-lg sm:text-xl font-bold text-center sm:text-left">
            {selectedCards.length} item(s) selected
          </span>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              className="w-full sm:w-auto bg-red-500 text-lg sm:text-xl dark:text-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition"
              onClick={handleUnselectAll}
            >
              Unselect all
            </button>
            <a
              className="w-full sm:w-auto bg-blue-500 text-lg sm:text-xl dark:text-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition text-center"
              href={url}
              download={fileName}
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
