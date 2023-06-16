import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

test('Testa se a página de Login renderiza como esperado', () => {
  renderWithRouterAndRedux(<Login />);

  const email = screen.getByTestId('email-input');
  const password = screen.getByTestId('password-input');
  const button = screen.getByRole('button', 'Entrar');
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  userEvent.type(email, 'email@email.com');
  expect(button).toBeDisabled();
  userEvent.type(password, 'password');
  expect(button).not.toBeDisabled();

  userEvent.click(button);
  expect(email).not.toBeInTheDocument();
  expect(password).not.toBeInTheDocument();
});
