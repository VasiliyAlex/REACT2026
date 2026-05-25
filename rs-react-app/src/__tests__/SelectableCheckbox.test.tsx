import { render, fireEvent } from '@testing-library/react';
import { SelectableCheckbox } from '../components/SelectableCheckbox';

describe('SelectableCheckbox', () => {
  it('calls onToggle when clicked', () => {
    const onToggleMock = jest.fn();
    const { getByTitle } = render(
      <SelectableCheckbox checked={false} onToggle={onToggleMock} />
    );

    const checkbox = getByTitle('Select');
    fireEvent.click(checkbox);

    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  it('has class bg-blue-500 when checked=true', () => {
    const { getByTitle } = render(
      <SelectableCheckbox checked={true} onToggle={() => {}} />
    );

    const checkbox = getByTitle('Select');
    expect(checkbox).toHaveClass('bg-blue-500');
  });

  it('has class bg-white when checked=false', () => {
    const { getByTitle } = render(
      <SelectableCheckbox checked={false} onToggle={() => {}} />
    );

    const checkbox = getByTitle('Select');
    expect(checkbox).toHaveClass('bg-white');
  });
});
