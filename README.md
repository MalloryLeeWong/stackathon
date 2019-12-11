# Earthquake Relief Tracer

Earthquake Relief Tracer is a prototype for a decentralized web application built on the Ethereum blockchain that empowers users to make traceable charity donations for earthquake relief. The user can make a donation in ETH to a selected charity at any time using their MetaMask wallet. As soon as an earthquake of at least 8.0 magnitude is reported, the user's donation will be automatically disbursed to the charity's MetaMask wallet. Only then can the designated charity's wallet withdraw the funds. The transaction history of the donation's deposit and withdrawal is recorded on the Ethereum blockchain for future reference by all stakeholders.

# Technologies used:
- Javascript
- React
- Solidity
- Web3
- Truffle
- Ganache
- MetaMask

On the back end, the app's escrow functionality is built with a smart contract written in Solidity. When external data provided to the smart contract fulfills a pre-defined condition, the smart contract will automatically execute by disbursing ETH collected from one wallet to another specified wallet.

On the front end, React was used to create a single page application and dynamically render payment status updates in a performant way. Web3 was used to programmatically access the smart contract and Ethereum blockchain from within React components.

Truffle was used to help build and deploy the smart contract to a test blockchain provided by Ganache. MetaMask was connected to these developer tools to test payments from one wallet to another.

This app was bootstrapped with a Truffle Box that utilizes Create React App.
