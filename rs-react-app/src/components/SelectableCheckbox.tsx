type Props = {
  checked: boolean;
  onToggle: () => void;
};

export const SelectableCheckbox = ({ checked, onToggle }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <div
      onClick={handleClick}
      className={`absolute top-2 right-2 w-5 h-5 rounded border transition
          ${checked ? 'bg-blue-500 border-blue-600' : 'bg-white border-gray-300 dark:bg-gray-300'}
        `}
      title="Select"
    />
  );
};
