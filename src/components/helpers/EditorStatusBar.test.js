import { render, screen } from '@testing-library/react';
import EditorStatusBar from './EditorStatusBar';

test('Render', () => {
  render(<EditorStatusBar line={10} column={20} fontSize={16} tabSize={2} />);
  const lineColumn = screen.getByText('Ln: 10 Col: 20');
  expect(lineColumn).toBeInTheDocument();

  const fontSize = screen.getByText('Font 16px');
  expect(fontSize).toBeInTheDocument();

  const tabSize = screen.getByText('Spaces 2');
  expect(tabSize).toBeInTheDocument();
});
