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
  const currencies = await getCurrenciesAPI();
  dispatch(getCurrencies(currencies));
};
