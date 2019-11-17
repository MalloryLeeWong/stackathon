import React, { Component } from "react";

class Donate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ETH: '',
      address: '',
      message: 'Please submit donation details above.'
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
      this.setState({message: 'Waiting on transaction success...'})
      await this.props.contract.methods.deposit(this.state.address).send({ from: this.props.accounts[0], value: this.props.web3.utils.toWei(this.state.ETH, 'ether')});
      this.setState({
        ETH: '',
        address: '',
        message: 'Your donation was sent!'
      });
    } catch (error) {
      alert(
        `Failed handle submit.`,
      );
      console.error(error)
    }
  }

  render() {
    return (
      <div>
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

        <button type="submit">Donate</button>
      </form>
      <div>
        <p>Donation Status: {this.state.message}</p>
      </div>
      </div>
    );
  }
}

export default Donate
