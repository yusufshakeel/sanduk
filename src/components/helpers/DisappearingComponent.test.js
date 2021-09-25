import { render, screen, waitFor } from '@testing-library/react';
import DisappearingComponent from './DisappearingComponent';

test('Render', async () => {
  render(
    <DisappearingComponent timeout={1000}>
      <h1>Hello World</h1>
    </DisappearingComponent>
  );
  expect(screen.getByText('Hello World')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByText('Hello World')).not.toBeInTheDocument();
  });
});
