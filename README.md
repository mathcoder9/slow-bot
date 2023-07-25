## Slow Protocol Bot

> CAUTION! Use at Your own risk! I take no responsibility for your transactions!

## What does it do?

This bot mints $SLOW for SOL, calls burn and then sells $SLOW token for mSol.

## other notes

This bot interacts with unaudited smart contracts. Might not be a great idea.. Also, you might want to double check all of the addresses used... Use at your own risk.

## How to use it

### Creating token accounts / lookup table accounts

- Lazy way to make token accounts is to just buy a tiny amount of the token and check solscan...
- Address lookup tables - see [here](https://docs.solana.com/developing/lookup-tables). Make sure all of the accounts in the initInstructions() method in src/index.ts are included.

### Requirements

- Install Node.js (v17.9.1) with Yarn (1.22.19)
- `yarn`
- Copy .env.example to .env file in project root.
- Edit .env file and put your wallet private key and other options.
- Start by running `yarn start`

## Why?

I noticed a few accounts spamming transactions like this [...](https://solscan.io/tx/2A9jragZ4Q2NLS7nan8aqbrgxvVKWJVC3WgbXtHaB6hwMA2jpbNKnHC77SYRppSxTMU89A155464dBVb4gUZmPcA)
