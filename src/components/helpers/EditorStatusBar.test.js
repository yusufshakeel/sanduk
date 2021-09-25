import { render, screen } from '@testing-library/react';
import EditorStatusBar from './EditorStatusBar';

test('Render', () => {
  render(<EditorStatusBar line={10} column={20} fontSize={16} tabSize={2} />);
  const line = screen.getByText('Ln: 10');
  expect(line).toBeInTheDocument();

  const column = screen.getByText('Col: 20');
  expect(column).toBeInTheDocument();

  const fontSize = screen.getByText('Font 16px');
  expect(fontSize).toBeInTheDocument();

  const tabSize = screen.getByText('Spaces 2');
  expect(tabSize).toBeInTheDocument();
});
