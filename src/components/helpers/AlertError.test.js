import { render, screen } from '@testing-library/react';
import AlertError from './AlertError';

test('Render', () => {
  render(
    <AlertError>
      <h1>Some Error</h1>
    </AlertError>
  );
  expect(screen.getByText('Some Error')).toBeInTheDocument();
});
