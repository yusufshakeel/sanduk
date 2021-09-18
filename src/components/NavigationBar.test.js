import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavigationBar from './NavigationBar';

test('Render', () => {
  render(<NavigationBar toggleTheme={() => {}} darkModeEnabled={true} />);
  expect(screen.getByText('sanduk')).toBeInTheDocument();
});

test('Should have darkMode switch checked on', () => {
  render(<NavigationBar toggleTheme={() => {}} darkModeEnabled={true} />);
  const toggleSwitch = screen.getByRole('checkbox');
  expect(toggleSwitch).toBeInTheDocument();
  expect(toggleSwitch).toBeChecked();
});

test('Should be able to toggle darkMode switch', () => {
  render(<NavigationBar toggleTheme={() => {}} darkModeEnabled={true} />);
  const toggleSwitch = screen.getByRole('checkbox');
  expect(toggleSwitch).toBeChecked();
  userEvent.click(toggleSwitch);
  expect(toggleSwitch).not.toBeChecked();
});
