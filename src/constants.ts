import { Connection, PublicKey } from "@solana/web3.js";
import * as dotenv from "dotenv";
import idl from "./idl/slow.json" assert { type: "json" };

dotenv.config({ path: ".env" });

export const CONNECTION = new Connection(process.env.RPC_ENDPOINT);

export const SLOW_IDL = idl;

export const SLOW_PROGRAM_ID = new PublicKey(
  "s1owa2k7P2kkLEenZPKuGddWMVpy8Pt2oMVeBdtSHM6"
);
export const SLOW_MINT = new PublicKey(
  "2KE2UNJKB6RGgb78DxJbi2HXSfCs1EocHj4FDMZPr4HA"
);
export const SLOW_STATE = new PublicKey(
  "HobVrQpdkms7h57vcfaTW4Lqmxd5EatY2MYRavtvF1oL"
);
export const SLOW_SOL_TREASURY = new PublicKey(
  "BswAaS7SVs59zXe45dToq1FKmJr4nMHBHBjBEfibM5b9"
);
export const SLOW_MSOL_TREASURY = new PublicKey(
  "7ysRpeKN76QjwC4btS9a6hiyinvgzEVLvWPP97M42jNg"
);
export const SLOW_TOKEN_ACCOUNT = new PublicKey(process.env.SLOW_TOKEN_ACCOUNT);
export const MSOL_TOKEN_ACCOUNT = new PublicKey(process.env.MSOL_TOKEN_ACCOUNT);
export const LOOKUP_TABLE_PUBLIC_KEY = new PublicKey(
  process.env.LOOKUP_TABLE_PUBLIC_KEY
);
