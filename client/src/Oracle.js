import React, { Component } from "react";

class Oracle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seismicity: '',
      address: '',
      message: 'Please submit seismicity data above.'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    try {
      event.preventDefault();
      this.setState({message: 'Updating seismicity data...'})
      await this.props.contract.methods.deposit(this.state.address).send({ from: this.props.accounts[0], value: this.props.web3.utils.toWei(this.state.ETH, 'ether')});
      this.setState({
        ETH: '',
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
        <p>If you are the oracle, please enter latest seismicity data:</p>
      <form onSubmit={this.handleSubmit}>
        <label>
          Seismicity Level:
          <input
            type="number"
            name="seismicity"
            onChange={this.handleChange}
            value={this.state.seismicity}
          />
        </label>

        <label>
          Oracle's Address:
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={this.state.address}
          />
        </label>

        <button type="submit">Donate</button>
      </form>
      <div>
        <p>Data Status: {this.state.message}</p>
      </div>
      </div>
    );
  }
}

export default Oracle
