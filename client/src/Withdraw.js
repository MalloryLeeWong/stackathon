import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./getWeb3";

import "./App.css";

class Withdraw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ETH: 0,
      address: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addCampus(this.state);
    this.setState({
      name: '',
      address: '',
    });
  }

  render() {
    return (
      <div>
        <p>If you are the charity, click here to withdraw:</p>
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
      </div>
    );
  }

}


export default Withdraw
