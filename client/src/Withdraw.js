import React, { Component } from "react";

class Withdraw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ETH: 0,
      addressCharity: '',
      addressDonor: '',
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
      event.preventDefault()

      this.setState({message: 'Waiting on transaction success...'})

      const response = await this.props.contract.methods.withdraw(this.state.addressCharity).send({ from: this.state.addressCharity});

      console.log('RESPONSE', response)

      this.setState({
        name: '',
        address: '',
        message: 'Donation withdrawn successfully!'
      });
    } catch (error) {
      alert(
        `Donation can be withdrawn once an earthquake of at least 7.0 magnitude has been reported.`,
      );
      console.error(error)
    }

  }

  render() {
    // console.log('this.state.addressDonor', this.state.addressDonor)
    console.log('WITHDRAW: this.props.accounts[0]', this.props.accounts[0])
    return (
      <div>
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
        <p>Withdrawal Status: {this.state.message}</p>
      </div>
      </div>
    );
  }
}

export default Withdraw
