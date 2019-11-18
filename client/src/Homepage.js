import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
// import Donate from "./Donate"
// import Withdraw from "./Withdraw"
// import Oracle from "./Oracle"
import Navbar from "./Navbar"
// import {withRouter as Router, Route, Switch, Link} from 'react-router-dom'
import "./App.css";

class Homepage extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state.
      this.setState({ web3, accounts, contract: instance });

      // console.log('Hompage: this.state.accounts', this.state.accounts)
      // console.log('Hompage: this.state.contract', this.state.contract)

    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract.`,
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    // return (
    //   <div className="App">
    //     {/* <h1>AidTrace</h1>
    //     <h2>Make a donation today that you can trace.</h2> */}
    //     <Navbar web3={this.state.web3} contract={this.state.contract} accounts={this.state.accounts}/>
    //     <br></br>
    //     <div className="Contract">
    //       <Donate web3={this.state.web3} contract={this.state.contract} accounts={this.state.accounts}/>
    //     </div>
    //     <br></br>
    //     <div className="Oracle">
    //       <Oracle web3={this.state.web3} contract={this.state.contract} accounts={this.state.accounts}/>
    //     </div>
    //     <br></br>
    //     <div className="Withdraw">
    //       <Withdraw web3={this.state.web3} contract={this.state.contract} accounts={this.state.accounts}/>
    //     </div>
    //   </div>
    // );
    return (
      <div className="App">
        {/* <h1>AidTrace</h1>
        <h2>Make a donation today that you can trace.</h2> */}
        <Navbar />
        {/* <br></br>
        <div className="Contract">
          <Donate web3={this.state.web3} contract={this.state.contract} accounts={this.state.accounts}/>
        </div>
        <br></br>
        <div className="Oracle">
          <Oracle web3={this.state.web3} contract={this.state.contract} accounts={this.state.accounts}/>
        </div>
        <br></br>
        <div className="Withdraw">
          <Withdraw web3={this.state.web3} contract={this.state.contract} accounts={this.state.accounts}/>
        </div> */}
      </div>
    );
  }
}

export default Homepage;
