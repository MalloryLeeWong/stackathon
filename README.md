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
- Remix IDE

On the back end, the app's escrow functionality is built with a smart contract written in Solidity. When external data provided to the smart contract fulfills a pre-defined condition, the smart contract will automatically execute by disbursing ETH collected from one wallet to another specified wallet. Remix was the IDE used to develop and test the smart contract.

On the front end, React was used to create a single page application and dynamically render payment status updates in a performant way. Web3 was used to programmatically access the smart contract and Ethereum blockchain from within React components.

Truffle was used to help build and deploy the smart contract to a test blockchain provided by Ganache. MetaMask was connected to these developer tools to test payments from one wallet to another.

This app was bootstrapped with a Truffle Box that utilizes Create React App.

# Steps to run locally:

1. Fork and clone this repo
2. npm i
3. truffle develop
4. compile
5. migrate
6. In another terminal, to start the app, cd client npm run start
7. Open a local personal instance of an Ethereum blockchain via Ganache and configure the port number to match the localhost for MetaMask (7545) per the port set in the truffle-config and getWeb3.js
8. Log into a test MetaMask account for the transaction sender (donor). Add test ETH to the sender's wallet (e.g. https://faucet.metamask.io/). Follow the prompts in the 'Donate' view to send ETH to be held in escrow.
9. Navigate to the 'Update seismic data' view. Log into the test MetaMask account for the geological data provider. Follow the prompts to submit an integer for the seismic level (must enter at least 8.0 or up to enable ETH held in escrow smart contract to be withdrawn by the recipient wallet). Confirm transaction in MetaMask.
10. Navigate to the 'Receive donation' view. Log into a test MetaMask account for the recipient (charity). Follow the prompts to withdraw ETH held in the escrow contract. Confirm transaction in MetaMask.

Note: Until navigation is fixed, the browser must be refreshed to render the forms in each view for donating, updating the seismic data, and withdrawing the funds.

# Planned bug fixes and updates:

- Fix React routes so page refresh isn't required to render each view.
- Build out true oracle functionality to feed real-world seismic data figures into the smart contract to replace the existing manual input option for entering seismic data.
- Use Drizzle components to improve UX/UI, keep code more DRY by re-using modular components, and reduce manual configuration.
- Refactor React class components to use functional components and hooks where possible
- Create develop branch so pull requests can be made to develop first before those commits are merged to master.
