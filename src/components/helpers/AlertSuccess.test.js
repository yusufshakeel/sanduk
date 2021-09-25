import { render, screen } from '@testing-library/react';
import AlertSuccess from './AlertSuccess';

test('Render', () => {
  render(
    <AlertSuccess>
      <h1>Some Success</h1>
    </AlertSuccess>
  );
  expect(screen.getByText('Some Success')).toBeInTheDocument();
});
