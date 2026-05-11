import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorButton } from '../components/ErrorButton';

describe('ErrorButton', () => {
  it('renders button correctly', () => {
    render(<ErrorButton onClick={vi.fn()} />);

    const button = screen.getByRole('button', {
      name: /error button/i,
    });

    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ErrorButton onClick={onClick} />);

    const button = screen.getByRole('button', {
      name: /error button/i,
    });

    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});