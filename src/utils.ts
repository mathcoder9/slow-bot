import { Keypair, Connection, Commitment } from "@solana/web3.js";
import bs58 from "bs58";
import { Wallet } from "@project-serum/anchor";

export const getUserWallet = (walletPrivateKey: string) => {
  return new Wallet(
    Keypair.fromSecretKey(Buffer.from(bs58.decode(walletPrivateKey)))
  );
};

export const getLatestBlockhash = async (
  connection: Connection,
  commitment: Commitment = "finalized"
): Promise<string> => {
  let blockhash = "";
  try {
    blockhash = (await connection.getLatestBlockhash(commitment)).blockhash;
  } catch (e) {}
  return blockhash;
};
