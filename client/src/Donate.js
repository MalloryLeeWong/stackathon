import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./getWeb3";

import "./App.css";

class Donate extends Component {
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
    );
  }

}


export default Donate
