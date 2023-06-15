import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import { actionCreator } from '../redux/actions';

class Login extends React.Component {
  state = {
    isButtonDisabled: true,
    email: '',
    password: '',
    redirect: false,
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });

    this.setState((prev) => {
      const { email, password } = prev;
      const re = /\S+@\S+\.\S+/;
      const n = 6;
      if (re.test(email) && password.length >= n) {
        return { isButtonDisabled: false };
      }
      return { isButtonDisabled: true };
    });
  };

  handleLoginButton = () => {
    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(actionCreator(email));

    this.setState({
      redirect: true,
    });
  };

  render() {
    const { isButtonDisabled, redirect } = this.state;
    return (
      redirect ? <Redirect to="/carteira" /> : (

        <form>
          <label>
            Email:
            <input
              type="email"
              name="email"
              data-testid="email-input"
              onChange={ this.handleInputChange }
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              name="password"
              data-testid="password-input"
              minLength={ 6 }
              onChange={ this.handleInputChange }
            />
          </label>
          <button
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.handleLoginButton }
          >
            Entrar
          </button>
        </form>
      )
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
