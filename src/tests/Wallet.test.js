import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

test('Testa se a página de Carteira renderiza como esperado', () => {
  renderWithRouterAndRedux(<Wallet />);

  const email = screen.getByTestId('email-field');
  const expenses = screen.getByTestId('total-field');
  const value = screen.getByTestId('value-input');
  const description = screen.getByTestId('description-input');
  const currency = screen.getByTestId('currency-input');

  const button = screen.getByRole('button', 'Adicionar despesa');

  expect(email).toBeInTheDocument();
  expect(expenses).toBeInTheDocument();
  expect(value).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(currency).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  expect(expenses).toHaveTextContent(0);
  userEvent.type(value, '100');
  userEvent.type(description, 'teste despesa');
  userEvent.click(button);
  expect(value).toHaveTextContent('');
  expect(description).toHaveTextContent('');
});
