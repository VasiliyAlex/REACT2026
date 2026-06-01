import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { clearSelected } from '../store/selectedSlice';
import { saveAs } from 'file-saver';

export const SelectionFooter: React.FC = () => {
  const selected = useAppSelector((state) => state.selectedPokemons.selected);

  const dispatch = useAppDispatch();

  if (selected.length === 0) return null;

  const handleClear = () => {
    dispatch(clearSelected());
  };

  const handleDownload = () => {
    const csvContent = [
      ['ID', 'Name', 'Type(s)', 'Height', 'Weight'],
      ...selected.map((p) => [
        p.id,
        p.name,
        Array.isArray(p.types)
          ? p.types.map((t) => t.type.name).join(' / ')
          : '',
        p.height ?? '',
        p.weight ?? '',
      ]),
    ]
      .map((row) => row.map((val) => `"${val}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selected.length}_items.csv`);
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-100 dark:bg-gray-400  shadow-lg rounded p-2 flex flex-col gap-2 items-center z-50">
      <span className="font-semibold text-gray-600 dark:text-white">
        {selected.length} item{selected.length === 1 ? ' is' : 's are'} selected
      </span>
      <div className="flex flex-row gap-2">
        <button
          onClick={handleClear}
          className="w-32 h-10 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          Unselect all
        </button>
        <button
          onClick={handleDownload}
          className="w-32 h-10 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          Download
        </button>
      </div>
    </div>
  );
};
