import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense, fetchCurrencies, fetchExpenses } from '../redux/actions/index';
import '../style/WalletForm.css';

class WalletForm extends Component {
  state = {
    id: -1,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  componentDidUpdate(prevProps) {
    const { editor, idToEdit, expenses } = this.props;

    if (editor !== prevProps.editor && editor) {
      const editingExpense = expenses.find((expense) => expense.id === idToEdit);
      this.setState({
        value: editingExpense.value,
        description: editingExpense.description,
        currency: editingExpense.currency,
        method: editingExpense.method,
        tag: editingExpense.tag,
      });
    }
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  eraseState = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleAddButton = () => {
    this.setState((prev) => ({
      id: prev.id + 1,
    }), () => {
      const { id, value, description, currency, method, tag } = this.state;

      const expenses = {
        id,
        value,
        description,
        currency,
        method,
        tag,
      };

      const { dispatch } = this.props;
      dispatch(fetchExpenses(expenses));

      this.eraseState();
    });
  };

  handleEditButton = () => {
    const { idToEdit, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const editingExpense = expenses.find((expense) => expense.id === idToEdit);

    const newExpense = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: editingExpense.exchangeRates,
    };

    const { dispatch } = this.props;
    dispatch(editExpense(expenses, newExpense));

    this.eraseState();
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="expense-form">
        <div className="bg-grey">
          <label className="description-label">
            Descrição
            <input
              type="text"
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleInputChange }
            />
          </label>
          <label className="tag-label">
            Categoria
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <div className="division" />
          <br />
          <label className="value-label">
            Valor:
            <input
              type="number"
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleInputChange }
            />
          </label>
          <label className="method-label">
            Método de Pagamento:
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label className="currency-label">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleInputChange }
            >
              {
                currencies.map((currencyName, index) => (
                  <option key={ index } value={ currencyName }>{currencyName}</option>
                ))
              }
            </select>
          </label>
        </div>

        {
          editor ? (
            <button
              type="button"
              onClick={ this.handleEditButton }
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="button"
              onClick={ this.handleAddButton }
            >
              Adicionar despesa
            </button>
          )
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape({
      ask: PropTypes.string,
    }),
    currency: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
