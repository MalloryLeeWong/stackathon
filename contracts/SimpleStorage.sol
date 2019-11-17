pragma solidity ^0.5.0;

contract SimpleStorage {
  bool payout = false;
  address donor;

  mapping(address => uint) public deposits;

  constructor() public {
    donor = msg.sender;
  }

  function deposit(address charity) public payable {
    require(msg.sender == donor, "Only the donor can deposit donations.");
    uint amount = msg.value;
    require(amount > 0.01 ether, "Minimum donation required is 0.01 ether.");
    deposits[charity] = deposits[charity] + amount;
  }

  function determinePayout(uint seismicity, address oracle) public {
    require(msg.sender == oracle, "Only the oracle can determine the payout");
    if (seismicity > 7) {
      payout = true;
    } else {
      payout = false;
    }
  }

  function withdraw(address payable charity) public {
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

// contract SimpleStorage {
//   uint storedData;

  // function set(uint x) public {
  //   storedData = x;
  // }

//   function get() public view returns (uint) {
//     return storedData;
//   }
// }
