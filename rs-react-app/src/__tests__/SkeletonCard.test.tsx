import { render, screen } from '@testing-library/react';
import { SkeletonCard } from '../components/SkeletonCard';

describe('SkeletonCard', () => {
  it('renders skeleton card', () => {
    render(<SkeletonCard />);

    const skeleton = screen.getByTestId('skeleton-card');

    expect(skeleton).toBeInTheDocument();
  });

  it('has correct CSS classes', () => {
    render(<SkeletonCard />);

    const skeleton = screen.getByTestId('skeleton-card');

    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveClass('bg-gray-200');
  });
});