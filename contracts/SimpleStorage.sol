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
  address payable public charity;
  address public donor;

  mapping(address => uint256) public deposits;

  modifier onlyCharity() {
    require(msg.sender == charity, "Recipient not authorized.");
      _;
  }

  constructor() public {
    donor = msg.sender;
    // donor is assigned address of who is attempting to invoke the contract
  }

  // when user wants to donate to contract, require minimum
  function deposit() public payable {
    uint amount = msg.value;
    require(amount > 0.01 ether, "Minimum donation required is 0.01 ether.");
    deposits[charity] = deposits[charity] + amount;
  }
  function withdrawPayout () public onlyCharity {
    // this function can only be invoked if payout bool is true
    require(payout == true, "Your donation will be transferred after a natural disaster is reported.");
    // require(msg.sender == charity);
    uint payment = deposits[charity];
    deposits[charity] = 0;
    payout = false;
    charity.transfer(payment);
  }
}
