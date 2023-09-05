import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import '../style/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-page">
        <div className="bg-white">
          <Header />
          <WalletForm />
        </div>
        <Table />
      </div>

    );
  }
}

export default Wallet;
