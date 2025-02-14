import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { resetSelected } from '../../store/features/selectedItemsSlice';

const Popup: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedCharacterIds } = useAppSelector(
    (store) => store.selectedItems
  );

  const handleUnselectAll = () => {
    dispatch(resetSelected());
  };

  return (
    <>
      {selectedCharacterIds.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full px-24 bg-green-300 text-white p-4 flex justify-between items-center">
          <span className="text-black text-xl font-bold">
            {selectedCharacterIds.length} item(s) selected
          </span>
          <div>
            <button
              className="mr-4 bg-red-500 text-xl px-4 py-2 rounded-lg"
              onClick={handleUnselectAll}
            >
              Unselect all
            </button>
            <button className="bg-blue-500 text-xl px-4 py-2 rounded-lg">
              Download
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
