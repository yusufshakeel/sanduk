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

test('Re-render', async () => {
  render(
    <DisappearingComponent timeout={1000}>
      <h1>Hello World</h1>
    </DisappearingComponent>
  );
  expect(screen.getByText('Hello World')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByText('Hello World')).not.toBeInTheDocument();
  });

  render(
    <DisappearingComponent timeout={1000}>
      <h1>Hello World 2</h1>
    </DisappearingComponent>
  );
  expect(screen.getByText('Hello World 2')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByText('Hello World 2')).not.toBeInTheDocument();
  });
});
