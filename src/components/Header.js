import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Header.css';

class Header extends Component {
  expensesSum = () => {
    const { totalExpense } = this.props;
    const expenses = totalExpense
      .map((expense) => expense.value * expense.exchangeRates[expense.currency].ask);

    const finalExpense = expenses.reduce((acc, curr) => acc + curr, 0);
    return finalExpense.toFixed(2);
  };

  render() {
    const { emailState } = this.props;
    return (
      <header>
        <img src="" alt="" />
        <p>
          Email:
          {' '}
          <span data-testid="email-field">{emailState}</span>
        </p>
        <p>
          Despesa Total: R$
          {' '}
          <span data-testid="total-field">{this.expensesSum()}</span>
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailState: state.user.email,
  totalExpense: state.wallet.expenses,
});

Header.propTypes = {
  emailState: PropTypes.string.isRequired,
  totalExpense: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    exchangeRates: PropTypes.shape({
      ask: PropTypes.string,
    }),
    currency: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
