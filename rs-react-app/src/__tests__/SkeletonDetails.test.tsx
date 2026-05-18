import { render, screen } from '@testing-library/react';
import { SkeletonDetails } from '../components/SkeletonDetails';

describe('SkeletonDetails', () => {
  it('renders skeleton container with correct test id', () => {
    render(<SkeletonDetails />);
    const container = screen.getByTestId('skeleton-details');
    expect(container).toBeInTheDocument();
  });

  it('renders title, image and list items', () => {
    render(<SkeletonDetails />);
    const container = screen.getByTestId('skeleton-details');
    const titleDiv = container.querySelector('div');
    expect(titleDiv).toBeInTheDocument();
    const avatar = container.querySelector('div.rounded-full');
    expect(avatar).toBeInTheDocument();
    const listItems = container.querySelectorAll('ul > li');
    expect(listItems.length).toBe(4);
  });
});
