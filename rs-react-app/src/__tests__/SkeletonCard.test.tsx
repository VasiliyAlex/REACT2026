import { render } from '@testing-library/react';
import { SkeletonCard } from '../components/SkeletonCard';

describe('SkeletonCard', () => {
  it('renders without crashing', () => {
    render(<SkeletonCard />);
  });
});
