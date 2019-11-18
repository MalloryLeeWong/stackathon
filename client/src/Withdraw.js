import React, { Component } from "react";
import Navbar from "./Navbar"
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

class Withdraw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ETH: 0,
      addressCharity: '',
      addressDonor: '',
      message: 'Please submit donation details above.',
      web3: null,
      accounts: null,
      contract: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    }

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

      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract.`,
        );
        console.error(error);
      }
    };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    try {
      event.preventDefault()

      this.setState({message: 'Waiting on transaction success...'})

      await this.state.contract.methods.withdraw(this.state.addressCharity).send({ from: this.state.addressCharity});

      this.setState({
        name: '',
        addressDonor: '',
        addressCharity: '',
        message: 'Donation withdrawn successfully!'
      });
    } catch (error) {
      alert(
        `Donation can be withdrawn once an earthquake of at least 8.0 magnitude has been reported.`,
      );
      console.error(error)
    }

  }

  render() {
    return (
      <div>
        <div>
          <Navbar/>
        </div>
      <div className="Withdraw">
        <p>If you are the charity, please click here to withdraw the donation:</p>
      <form onSubmit={this.handleSubmit}>
      <label>
          Donor's Address:
          <input
            type="text"
            name="addressDonor"
            onChange={this.handleChange}
            value={this.state.addressDonor}
          />
        </label>
        <label>
          Charity's Address:
          <input
            type="text"
            name="addressCharity"
            onChange={this.handleChange}
            value={this.state.addressCharity}
          />
        </label>

        <button className="btn" type="submit">Withdraw Donation</button>
      </form>
      <div>
        <p className="italic">Withdrawal Status: {this.state.message}</p>
      </div>
      </div>
      </div>
    );
  }
}

export default Withdraw
