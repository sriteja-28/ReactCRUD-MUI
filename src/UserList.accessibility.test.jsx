import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import UserList from './components/UserList';

expect.extend(toHaveNoViolations);

test('UserList should have no accessibility violations', async () => {
  const { container } = render(<UserList />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
