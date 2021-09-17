import { render, screen } from '@testing-library/react';
import App from './App';

test('Launch App', () => {
  render(<App />);
  expect(screen.getByText('sanduk')).toBeInTheDocument();
});
