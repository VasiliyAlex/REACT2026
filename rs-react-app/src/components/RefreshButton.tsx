import React from 'react';

type Props = {
  onRefresh: () => void;
};

export const RefreshButton: React.FC<Props> = ({ onRefresh }) => {
  return (
    <button
      type="button"
      onClick={onRefresh}
      className={`ml-auto px-4 py-1 bg-blue-500 text-white p-2 `}
    >
      Refresh
    </button>
  );
};
