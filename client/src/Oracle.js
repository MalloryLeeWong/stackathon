import React, { Component } from "react";
import Navbar from "./Navbar"
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

class Oracle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seismicity: '',
      address: '',
      message: 'Please submit seismicity data above.',
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
      event.preventDefault();

      this.setState({message: 'Updating seismicity data...'})

      await this.state.contract.methods.determinePayout(this.state.seismicity, this.state.address).send({ from: this.state.address});

      this.setState({
        seismicity: '',
        address: '',
        message: 'Seismicity data updated!'
      });
    } catch (error) {
      alert(
        `Failed oracle submission.`,
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
      <div className="Oracle">
        <p>If you are the oracle, please enter latest seismicity data:</p>
      <form onSubmit={this.handleSubmit}>
        <label>
          Seismicity (nearest whole number):
          <input
            type="number"
            name="seismicity"
            onChange={this.handleChange}
            value={this.state.seismicity}
          />
        </label>

        <label>
          Data Provider's Address:
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={this.state.address}
          />
        </label>

        <button className="btn" type="submit">Update</button>
      </form>
      <div>
        <p className="italic">Data Status: {this.state.message}</p>
      </div>
      </div>
      </div>
    );
  }
}

export default Oracle
