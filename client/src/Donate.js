import React, { Component } from "react";
import Navbar from "./Navbar";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

class Donate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ETH: '',
      address: '',
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

        // console.log('Hompage: this.state.accounts', this.state.accounts)
        // console.log('Hompage: this.state.contract', this.state.contract)

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
      event.preventDefault();
      this.setState({message: 'Waiting on transaction success...'})

      await this.state.contract.methods.deposit(this.state.address).send({ from: this.state.accounts[0], value: this.state.web3.utils.toWei(this.state.ETH, 'ether')});
      this.setState({
        ETH: '',
        address: '',
        message: 'Your donation was sent!'
      });
    } catch (error) {
      alert(
        `Failed donation submission.`,
      );
      console.error(error)
    }
  }

  render() {
    // console.log('DONATE: this.props.accounts[0]', this.props.accounts[0])
    // console.log('Donate: this.props', this.props)
    return (
      <div>
        <div>
          <Navbar/>
        </div>
      <div className="Contract">
        <p>Donate today:</p>
      <form onSubmit={this.handleSubmit}>
        <label>
          Donation Amount (ETH):
          <input
            type="text"
            name="ETH"
            onChange={this.handleChange}
            value={this.state.ETH}
          />
        </label>

        <label>
          Charity's Address:
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={this.state.address}
          />
        </label>

        <button className="btn" type="submit">Donate</button>
      </form>
      <div>
        <p>Donation Status: {this.state.message}</p>
      </div>
      </div>
      </div>
    );
  }
}

export default Donate
