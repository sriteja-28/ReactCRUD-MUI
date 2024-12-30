import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App.jsx';


vi.mock('./components/UserList.jsx', () => () => <div>User List Component</div>);
vi.mock('./components/UserForm.jsx', () => () => <div>User Form Component</div>);

describe('App Component', () => {
  test('renders UserList for the default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('User List Component')).toBeInTheDocument();
  });

  test('renders UserForm for /add route', () => {
    render(
      <MemoryRouter initialEntries={['/add']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('User Form Component')).toBeInTheDocument();
  });

  test('renders UserForm for /edit/:id route', () => {
    render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('User Form Component')).toBeInTheDocument();
  });
});
