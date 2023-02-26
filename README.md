Harmony Staking SDK - React App example
-----------

This is an example React application that demonstrates how to use the `harmony-staking-sdk` library to interact with Harmony blockchain's staking contracts. It includes two components, `StakingBlock` and `ValidatorInfo`, that allow users to delegate, undelegate, and claim rewards for a specific validator address.

`StakingBlock` component has a form that allows the user to input the amount of ONE tokens they want to delegate to a validator, and three buttons to delegate, undelegate, and claim rewards. When the user clicks any of the buttons, the corresponding function is executed and sends a transaction to the Harmony blockchain.

`ValidatorInfo` component displays information about a specific validator, including the validator's name, address, total stake, self-stake, total number of delegators, and website.

Dependencies
------------

This React application requires the following dependencies:

*   `React`: a JavaScript library for building user interfaces
*   `react-bootstrap`: a UI library for React that provides pre-built components
*   `web3`: a JavaScript library for interacting with Ethereum-compatible blockchains
*   `harmony-staking-sdk`: a Harmony blockchain library that provides an API for interacting with staking contracts.

Installation and Usage
----------------------

To install and use this React application:

1.  Clone the repository using `git clone https://github.com/{repository-name}.git`.
2.  In the root directory, run `npm install` to install the required dependencies.
3.  Run `npm start` to start the application in development mode.
4.  Open `http://localhost:3000` to view the application in the browser.

You can interact with the `StakingBlock` component by inputting the amount of ONE tokens you want to delegate, and then clicking on any of the three buttons: `Delegate`, `UnDelegate`, or `Claim Rewards`.

You can also view the `ValidatorInfo` component by passing a validator address as a prop to the component.

Notes
-----

*   This is an example application that demonstrates how to use the `harmony-staking-sdk` library with React. You should modify the code to fit your specific use case.
*   You will need to have Metamask or a similar web3 wallet installed in your browser to use this application.