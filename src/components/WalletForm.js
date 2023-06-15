import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label>
          Valor:
          <input type="number" data-testid="value-input" />
        </label>
        <label>
          Descrição:
          <input type="text" data-testid="description-input" />
        </label>
        <label>
          Moeda:
          <select data-testid="currency-input">
            {
              currencies.map((currency, index) => (
                <option key={ index } value={ currency }>{currency}</option>
              ))
            }
          </select>
        </label>
        <label>
          Método de Pagamento:
          <select data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label>
          Categoria
          <select data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
