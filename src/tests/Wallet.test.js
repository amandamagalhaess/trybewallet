// import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa se a página de Carteira renderiza como esperado', () => {
  it('Testa se existe um Header na pagina', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const email = screen.getByTestId('email-field');
    const expenses = screen.getByTestId('total-field');

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(expenses).toBeInTheDocument();
  });

  it('Testa se existe um formulário e uma tabela', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const button = screen.getByRole('button', 'Adicionar despesa');

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('É possível adicionar, editar e excluir uma despesa', async () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = await screen.findByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const button = screen.getByRole('button', 'Adicionar despesa');

    userEvent.type(value, '100');
    userEvent.type(description, 'teste despesa');
    await waitFor(() => {
      userEvent.selectOptions(currency, 'EUR');
    });
    userEvent.selectOptions(method, 'Cartão de crédito');
    userEvent.selectOptions(tag, 'Lazer');

    userEvent.click(button);

    expect(value.value).toBe('');
    expect(description.value).toBe('');
    expect(currency).toHaveValue('USD');
    expect(method).toHaveValue('Dinheiro');
    expect(tag).toHaveValue('Alimentação');

    expect(await screen.findByText('100.00')).toBeInTheDocument();
    expect(await screen.findByText('teste despesa')).toBeInTheDocument();
    expect(await screen.findByText('Euro/Real Brasileiro')).toBeInTheDocument();

    const editBtn = await screen.findByTestId('edit-btn');
    expect(editBtn).toBeInTheDocument();

    userEvent.click(editBtn);

    const editExpenseBtn = await screen.findByText('Editar despesa');
    expect(editExpenseBtn).toBeInTheDocument();

    userEvent.type(value, '0');
    userEvent.type(description, ' 2');
    await waitFor(() => {
      userEvent.selectOptions(currency, 'USD');
    });

    userEvent.click(editExpenseBtn);

    expect(await screen.findByText('1000.00')).toBeInTheDocument();
    expect(await screen.findByText('teste despesa 2')).toBeInTheDocument();
    expect(await screen.findByText('Dólar Americano/Real Brasileiro')).toBeInTheDocument();

    const deleteBtn = await screen.findByTestId('delete-btn');
    expect(deleteBtn).toBeInTheDocument();

    userEvent.click(deleteBtn);

    expect(screen.queryByText('1000.00')).not.toBeInTheDocument();
  });
});
