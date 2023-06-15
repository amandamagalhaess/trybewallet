import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Header.css';

class Header extends Component {
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
          <span data-testid="total-field">0</span>
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailState: state.user.email,
});

Header.propTypes = {
  emailState: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
