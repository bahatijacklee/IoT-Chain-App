import { ethers } from "ethers";

export const CONTRACT_ADDRESSES = {
  DeviceRegistry: "0x...", // Add your deployed contract addresses
  IoTDataLedger: "0x...",
  AccessManager: "0x...",
  TokenRewards: "0x...",
  OracleIntegration: "0x...",
};

export const getContract = async (
  contractName: keyof typeof CONTRACT_ADDRESSES,
  signer?: ethers.Signer,
) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractABI = await import(`./abis/${contractName}.json`).then(
    (m) => m.default,
  );
  return new ethers.Contract(
    CONTRACT_ADDRESSES[contractName],
    contractABI,
    signer || provider,
  );
};
