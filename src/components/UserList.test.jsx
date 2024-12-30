import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import UserList from './UserList';

vitest.mock('axios');

test('renders users and deletes a user', async () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ];

  axios.get.mockResolvedValueOnce({ data: users });

  render(<UserList />);

  const userElements = await screen.findAllByText(/Doe/i);
  expect(userElements).toHaveLength(2);

  const deleteButton = screen.getByText(/Delete/i);
  fireEvent.click(deleteButton);

  axios.delete.mockResolvedValueOnce({});
  expect(axios.delete).toHaveBeenCalledWith('http://localhost:3001/users/1');
});
