# EtherSign - Document Signing on the blockchain

## The Background
You can read up on the motivation and design decision in `design_pattern_decision.md`. The base contract also implemented patterns to avoid common attacks which you can also find detailed explainations in `avoiding_common_attacks.md`.

## Visit the Deployed Dapp

This app has been deployed to Surge and is now live, you can visit the site at [ethersign.surge.sh](ethersign.surge.sh).  You do not need to have Metamask or Mist installed to view sample contract usages - information will be fetched via Infura instead. However if you wish to create and sign document yourself, please make sure you have Metamask installed and loggin into your Rinkeby account and have accquired some test ethers.

**Some sample use cases**:

- [Love letters](https://ethersign.surge.sh/#/view?q=loveLetter&id=1)
- [US Declaration of Independence](https://ethersign.surge.sh/#/view?q=declarationOfIndependence&id=2)
- [Land sale deed](https://ethersign.surge.sh/#/view?q=landDeed&id=3)
- [Prenuptial Agreement](https://ethersign.surge.sh/#/view?q=prenuptialAgreement&id=4) (names are completely fictional cough cough..)


## Running the Dapp Locally

**This app has been deployed to the Rinkeby testnet. To run the app locally with the Rinkeby contract:**
-  `cd` into the `/frontend` folder
- run `npm install`
- run `npm run dev` which should fire up a server on `http://localhost:8080/`
- Log into your Rinkeby ethereum account on Metamask in your prefered browser, visit `http://localhost:8080/`and play away!

**If you wish to deploy the contract locally on Ganache, follow below steps:**

- To compile the contract, run `truffle compile`.
- To deploy the contract to ganache, run `truffle migrate` while Ganache is open.
- Once the contract has been deployed to Ganache, copy the deployed address of the `EtherSign` contract from the log output of the migration.
-  Open the file `/frontend/src/util/etherSignContract.js`, find line #5 where `const address` was defined and paste the newly deployed address on Ganache to replace the Rinkeby testnet contract address.
-  `cd` into the `/frontend` folder
- run `npm install`
- run `npm run dev` which should fire up a server on `http://localhost:8080/`
- Log into your Ganache ethereum account on Metamask in your prefered browser, visit `http://localhost:8080/` and play away!

## Running the Tests

Make sure you are on the root folder level and have Ganache open, then run `truffle test`. The test file itself is stored at `/test/testEtherSign.js` where you can read up on the detailed explanation of each test.

## Questions and Issues

Please feel free to open issues at this repo if you have any questions!