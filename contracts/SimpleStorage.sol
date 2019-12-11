pragma solidity ^0.5.0;

contract SimpleStorage {
  // Set initial payout condition to false.
  bool payout = false;
  address donor;

  // Create mapping to store addresses for each deposit made.
  mapping(address => uint) public deposits;

  // Set the donor as the one who initially invokes the contract.
  constructor() public {
    donor = msg.sender;
  }

  // Create functionality for transferring payment from a wallet into escrow held by the smart contract.
  function deposit(address charity) public payable {
    require(msg.sender == donor, "Only the donor can deposit donations.");
    uint amount = msg.value;
    require(amount > 0.01 ether, "Minimum donation required is 0.01 ether.");
    deposits[charity] = deposits[charity] + amount;
  }

  // Set payout condition as fulfilled only when external data of greater than 8.0 seismicity is provided to the smart contract.
  function determinePayout(uint seismicity, address oracle) public {
    require(msg.sender == oracle, "Only the oracle can determine the payout");
    if (seismicity > 7) {
      payout = true;
    } else {
      payout = false;
    }
  }

  // Require that only a specified charity's wallet can withdraw the payment when the payout condition is met.
  function withdraw(address payable charity) public payable {
    require(payout == true, "Your donation will be sent once an earthquake of at least 7.0 is reported.");
    require(msg.sender == charity, "Only the designated charity can withdraw the donation.");
    uint payment = deposits[charity];
    deposits[charity] = 0;
    charity.transfer(payment);
  }

  function getBalance(address charity) public view returns (uint) {
    return deposits[charity];
  }
}
