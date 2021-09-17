import { render, screen } from '@testing-library/react';
import NavigationBar from './NavigationBar';

test('Launch App', () => {
  render(<NavigationBar />);
  expect(screen.getByText('sanduk')).toBeInTheDocument();
});
