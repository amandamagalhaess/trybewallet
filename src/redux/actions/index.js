import { getCurrenciesAPI } from '../../services/currencyAPI';

export const saveEmail = (email) => ({
  type: 'SAVE_EMAIL',
  email,
});

export const getCurrencies = (currencies) => ({
  type: 'GET_CURRENCIES',
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  const data = await getCurrenciesAPI();
  const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
  dispatch(getCurrencies(currencies));
};

export const addExpenses = (expenses) => ({
  type: 'ADD_EXPENSES',
  expenses,
});

export const fetchExpenses = (expenses) => async (dispatch) => {
  const data = await getCurrenciesAPI();

  expenses.exchangeRates = data;
  dispatch(addExpenses(expenses));
};

export const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

export const activateEdit = (id) => ({
  type: 'ACTIVATE_EDIT',
  id,
});

export const editExpense = (expenses, expense) => {
  const index = expenses.findIndex((item) => item.id === expense.id);
  expenses.splice(index, 1, expense);
  return ({
    type: 'EDIT_EXPENSE',
  });
};
