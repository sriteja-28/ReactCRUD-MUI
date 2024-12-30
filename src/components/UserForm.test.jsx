import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('navigates to add user form and adds a user', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText(/Add User/i));

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Alice' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'alice@example.com' } });

  fireEvent.click(screen.getByText(/Add User/i));

  expect(screen.getByText(/Alice/i)).toBeInTheDocument();
});
