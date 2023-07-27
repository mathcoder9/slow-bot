import pkg from "@project-serum/anchor";
const { AnchorProvider, BN, Program } = pkg;
import {
  AddressLookupTableAccount,
  ComputeBudgetProgram,
  PublicKey,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SystemProgram,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  CONNECTION,
  SLOW_PROGRAM_ID,
  SLOW_IDL,
  SLOW_MINT,
  SLOW_MSOL_TREASURY,
  SLOW_SOL_TREASURY,
  SLOW_STATE,
  SLOW_TOKEN_ACCOUNT,
  MSOL_TOKEN_ACCOUNT,
  LOOKUP_TABLE_PUBLIC_KEY,
} from "./constants.js";

import { getUserWallet, getLatestBlockhash } from "./utils.js";
import * as dotenv from "dotenv";

// load .env file
dotenv.config({ path: ".env" });

// initialize solana/web3
const wallet = getUserWallet(process.env.WALLET_PRIVATE_KEY);
const provider = new AnchorProvider(CONNECTION, wallet, {});
const program = new Program(SLOW_IDL as any, SLOW_PROGRAM_ID, provider);

let lookupTableAccount: AddressLookupTableAccount = null;
let fullInstructions: TransactionInstruction[] = null;
let blockhashCache: String = null;

// initialise integer env variables
const minAmountOut = parseInt(process.env.MIN_AMOUNT_OUT);
const mints = parseInt(process.env.MINT_AMOUNT);
const computeUnitLimit = parseInt(process.env.COMPUTE_UNIT_LIMIT);
const computeUnitPrice = parseInt(process.env.COMPUTE_UNIT_PRICE);

const initInstructions = async () => {
  try {
    const priofeeIx: TransactionInstruction =
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: computeUnitPrice,
      });

    const computeIx: TransactionInstruction =
      ComputeBudgetProgram.setComputeUnitLimit({
        units: computeUnitLimit,
      });

    const mintIx: TransactionInstruction = await program.methods
      .mint()
      .accounts({
        signer: wallet.publicKey,
        state: SLOW_STATE,
        treasury: SLOW_SOL_TREASURY,
        msolTreasury: SLOW_MSOL_TREASURY,
        mint: SLOW_MINT,
        tokenAccount: SLOW_TOKEN_ACCOUNT,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        instructionSysvarAccount: SYSVAR_INSTRUCTIONS_PUBKEY,
      })
      .instruction();

    const burnIx: TransactionInstruction = await program.methods
      .burn()
      .accounts({
        signer: wallet.publicKey,
        treasury: new PublicKey("BswAaS7SVs59zXe45dToq1FKmJr4nMHBHBjBEfibM5b9"),
        state: new PublicKey("HobVrQpdkms7h57vcfaTW4Lqmxd5EatY2MYRavtvF1oL"),
        stateTokenAccount: new PublicKey(
          "8SDYmWNY3omVgX2qe5yyWADYa7dhewfxfmgyx8zZx6TW"
        ),
        msolTreasury: new PublicKey(
          "7ysRpeKN76QjwC4btS9a6hiyinvgzEVLvWPP97M42jNg"
        ),
        mint: new PublicKey("2KE2UNJKB6RGgb78DxJbi2HXSfCs1EocHj4FDMZPr4HA"),
        msolMint: new PublicKey("mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"),
        marinadeMsolMintAuthority: new PublicKey(
          "3JLPCS1qM2zRw3Dp6V4hZnYHd4toMNPkNesXdX9tg6KM"
        ),
        marinadeProgram: new PublicKey(
          "MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD"
        ),
        marinadeState: new PublicKey(
          "8szGkuLTAux9XMgZ2vtY39jVSowEcpBfFfD8hXSEqdGC"
        ),
        marinadeLiqPoolSolLeg: new PublicKey(
          "UefNb6z6yvArqe4cJHTXCqStRsKmWhGxnZzuHbikP5Q"
        ),
        marinadeLiqPoolMsolLeg: new PublicKey(
          "7GgPYjS5Dza89wV6FpZ23kUJRG5vbQ1GM25ezspYFSoE"
        ),
        marinadeLiqPoolMsolLegAuthority: new PublicKey(
          "EyaSjUtSgo9aRD1f8LWXwdvkpDTmXAW54yoSHZRF14WL"
        ),
        marinadeSolReserve: new PublicKey(
          "Du3Ysj1wKbxPKkuPPnvzQLQh8oMSVifs3jGZjJWXFmHN"
        ),
        raydiumProgram: new PublicKey(
          "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"
        ),
        amm: new PublicKey("FmKAfMMnxRMaqG1c4emgA4AhaThi4LQ4m2A12hwoTibb"),
        ammAuthority: new PublicKey(
          "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1"
        ),
        ammOpenOrders: new PublicKey(
          "C3fSV6UrqQbJTzsezNYPyVt9WrU1Gzq2zCBDRDyWgu1U"
        ),
        ammTargetOrders: new PublicKey(
          "ChuSQQYMbVXpiBHfQfndz5U91NBHF9Ss5bPYk3jmBSVH"
        ),
        poolCoinTokenAccount: new PublicKey(
          "Aj6sC41ZqHZXc1mQEZRioou3Rr3Fku8hvyCpWqMm5zuq"
        ),
        poolPcTokenAccount: new PublicKey(
          "BgSvPcNqikNUDiHWLq8ms1LcHXBzaxHWhmg1TUcnpAfB"
        ),
        slowMarket: new PublicKey(
          "FWhNFbGkdvbfrT2ixfcWjXvJsPsjAcuFdhCt7fcyHLiE"
        ),
        slowEventQueue: new PublicKey(
          "83nw3HVvAHBmiSfnj5r2m1jntjm8vvC35dony2G8DkR4"
        ),
        slowBids: new PublicKey("HYdf9UX44BAk2AafXAheHYhtrPXy3GK8fqwsSckHnRsT"),
        slowAsks: new PublicKey("5qRKrGPYaQmazdtMnia1iC3gFbpgW4CT7KPrHq9nJGm5"),
        slowCoinVault: new PublicKey(
          "FG9Jjg28KPDECLeVYATbM7bifcX9JwpKb8LfkEy5J3AV"
        ),
        slowPcVault: new PublicKey(
          "F39Vwbev1YBtKQZjrjbhH666Mc42uVK66zMpddLWEFhq"
        ),
        slowVaultSigner: new PublicKey(
          "Etg2z3BgY91rcELmyRXYHpYgxMktxzAyxdnKZRx4TA81"
        ),
        dexProgram: new PublicKey(
          "srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX"
        ),
        tokenProgram: new PublicKey(
          "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        ),
        systemProgram: new PublicKey("11111111111111111111111111111111"),
      })
      .instruction();

    const swapIx: TransactionInstruction = await program.methods
      .balanceClearingSwap(new BN(minAmountOut))
      .accounts({
        signer: wallet.publicKey,
        raydiumProgram: new PublicKey(
          "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"
        ),
        amm: new PublicKey("FmKAfMMnxRMaqG1c4emgA4AhaThi4LQ4m2A12hwoTibb"),
        ammAuthority: new PublicKey(
          "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1"
        ),
        ammOpenOrders: new PublicKey(
          "C3fSV6UrqQbJTzsezNYPyVt9WrU1Gzq2zCBDRDyWgu1U"
        ),
        ammTargetOrders: new PublicKey(
          "ChuSQQYMbVXpiBHfQfndz5U91NBHF9Ss5bPYk3jmBSVH"
        ),
        poolCoinTokenAccount: new PublicKey(
          "Aj6sC41ZqHZXc1mQEZRioou3Rr3Fku8hvyCpWqMm5zuq"
        ),
        poolPcTokenAccount: new PublicKey(
          "BgSvPcNqikNUDiHWLq8ms1LcHXBzaxHWhmg1TUcnpAfB"
        ),
        serumMarket: new PublicKey(
          "FWhNFbGkdvbfrT2ixfcWjXvJsPsjAcuFdhCt7fcyHLiE"
        ),
        serumEventQueue: new PublicKey(
          "83nw3HVvAHBmiSfnj5r2m1jntjm8vvC35dony2G8DkR4"
        ),
        serumBids: new PublicKey(
          "HYdf9UX44BAk2AafXAheHYhtrPXy3GK8fqwsSckHnRsT"
        ),
        serumAsks: new PublicKey(
          "5qRKrGPYaQmazdtMnia1iC3gFbpgW4CT7KPrHq9nJGm5"
        ),
        serumCoinVaultAccount: new PublicKey(
          "FG9Jjg28KPDECLeVYATbM7bifcX9JwpKb8LfkEy5J3AV"
        ),
        serumPcVaultAccount: new PublicKey(
          "F39Vwbev1YBtKQZjrjbhH666Mc42uVK66zMpddLWEFhq"
        ),
        serumVaultSigner: new PublicKey(
          "Etg2z3BgY91rcELmyRXYHpYgxMktxzAyxdnKZRx4TA81"
        ),
        userSourceTokenAccount: SLOW_TOKEN_ACCOUNT,
        userDestinationTokenAccount: MSOL_TOKEN_ACCOUNT,
        userSourceOwner: wallet.publicKey,
        dexProgram: new PublicKey(
          "srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX"
        ),
        tokenProgram: new PublicKey(
          "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        ),
        systemProgram: new PublicKey("11111111111111111111111111111111"),
      })
      .instruction();

    return [priofeeIx, computeIx, mintIx, burnIx, swapIx];
  } catch (error) {
    console.log(error);
  }
};

const initLookupTable = async () => {
  try {
    lookupTableAccount = await CONNECTION.getAddressLookupTable(
      LOOKUP_TABLE_PUBLIC_KEY
    ).then((res) => res.value);
  } catch (error) {
    console.log(error);
  }
};

const createAndSendV0Tx = async (txInstructions: TransactionInstruction[]) => {
  // Fetch the latest blockhash
  let blockhash = await getLatestBlockhash(CONNECTION);
  if (blockhash === "") {
    // if we could not get blockhash, we cannot continue this attempt.
    return;
  }
  if (blockhash === blockhashCache) return;
  blockhashCache = blockhash;
  // Generate Transaction Message
  const messageV0 = new TransactionMessage({
    payerKey: wallet.payer.publicKey,
    recentBlockhash: blockhash,
    instructions: txInstructions,
  }).compileToV0Message([lookupTableAccount]);
  const tx = new VersionedTransaction(messageV0);

  // Sign message
  tx.sign([wallet.payer]);

  // Send message
  const txid = await provider.connection.sendTransaction(tx);
  console.log(txid);
};

const composeInstructions = async (instructions: TransactionInstruction[]) => {
  try {
    const priofeeIx = instructions[0];
    const computeIx = instructions[1];
    const mintIx = instructions[2];
    const burnIx = instructions[3];
    const swapIx = instructions[4];

    //compose instructions
    fullInstructions = [priofeeIx, computeIx];
    for (let j = 0; j < mints; j++) {
      fullInstructions.push(mintIx);
    }
    fullInstructions.push(burnIx);
    fullInstructions.push(swapIx);
  } catch (error) {
    console.log(error);
  }
};

const execute = async () => {
  while (true) {
    try {
      await createAndSendV0Tx(fullInstructions);
    } catch (error) {
      console.log(error);
    }
  }
};

const main = async () => {
  try {
    const instructions: TransactionInstruction[] = await initInstructions();
    await initLookupTable();
    await composeInstructions(instructions);
    await execute();
  } catch (error) {
    console.log(error);
  }
};

main();
