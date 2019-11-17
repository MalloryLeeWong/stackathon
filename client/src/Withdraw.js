import React, { Component } from "react";

class Withdraw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ETH: 0,
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
      // const oracleAddress = "0x031b64725dC73CC33CBAe743D1904A57EF4b60C1"

      event.preventDefault()

      this.setState({message: 'Waiting on transaction success...'})

      // await this.props.contract.methods.determinePayout(8, oracleAddress).send({from: oracleAddress});

      const response = await this.props.contract.methods.withdraw(this.state.address).send({ from: this.props.accounts[0], value: this.props.web3.utils.toWei('1', 'ether')});

      console.log('RESPONSE', response)

      this.setState({
        name: '',
        address: '',
        message: 'Donation withdrawn successfully!'
      });
    } catch (error) {
      alert(
        `Failed withdrawal submission.`,
      );
      console.error(error)
    }

  }

  render() {
    console.log('this.props.accounts[0]', this.props.accounts[0])
    return (
      <div>
        <p>If you are the charity, please click here to withdraw the donation:</p>
      <form onSubmit={this.handleSubmit}>
        <label>
          Charity's Address:
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={this.state.address}
          />
        </label>

        <button type="submit">Withdraw Donation</button>
      </form>
      <div>
        <p>Withdrawal Status: {this.state.message}</p>
      </div>
      </div>
    );
  }
}

export default Withdraw
