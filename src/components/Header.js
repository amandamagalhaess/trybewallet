import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Header.css';
import { CgProfile } from 'react-icons/cg';
import { FaCoins } from 'react-icons/fa';
import logo from '../style/imgs/logo Trybe Wallet.png';

class Header extends Component {
  expensesSum = () => {
    const { expenses } = this.props;
    const totalExpense = expenses
      .map((expense) => expense.value * expense.exchangeRates[expense.currency].ask);

    const sum = totalExpense.reduce((acc, curr) => acc + curr, 0);

    return sum.toFixed(2);
  };

  render() {
    const { emailState } = this.props;
    return (
      <header>
        <img src={ logo } alt="" />
        <p className="total-field">
          <FaCoins />
          Despesa Total:
          {' '}
          {' '}
          <span data-testid="total-field">{this.expensesSum()}</span>
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </p>
        <p className="email-field">
          <CgProfile />
          {' '}
          <span data-testid="email-field">{emailState}</span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailState: state.user.email,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

Header.propTypes = {
  emailState: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    exchangeRates: PropTypes.shape({
      ask: PropTypes.string,
    }),
    currency: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
