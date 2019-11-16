pragma solidity ^0.5.0;

// contract SimpleStorage {
//   uint storedData;

//   function set(uint x) public {
//     storedData = x;
//   }

//   function get() public view returns (uint) {
//     return storedData;
//   }
// }

contract Donate {
  bool payout = false;
  address donor;

  mapping(address => uint) public deposits;

  constructor() public {
    donor = msg.sender;
  }

  function deposit(address charity) public payable {
    require(msg.sender == donor, "Only donor can deposit donation.");
    uint amount = msg.value;
    require(amount > 0.01 ether, "Minimum donation required is 0.01 ether.");
    deposits[charity] = deposits[charity] + amount;
  }
  function withdraw(address payable charity) public {
    require(payout == true, "Your donation will be transferred after a natural disaster.");
    require(msg.sender == charity, "Only charity can withdraw donation.");
    uint payment = deposits[charity];
    deposits[charity] = 0;
    charity.transfer(payment);
  }
}
