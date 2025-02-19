import { useContractRead, useContractWrite, useAccount } from "wagmi";
import { CONTRACT_ADDRESSES } from "@/lib/contracts";

// Import ABIs statically
import AccessManagerABI from "@/lib/contracts/abis/AccessManager.json";
import DeviceRegistryABI from "@/lib/contracts/abis/DeviceRegistry.json";
import IoTDataLedgerABI from "@/lib/contracts/abis/IoTDataLedger.json";
import OracleIntegrationABI from "@/lib/contracts/abis/OracleIntegration.json";
import TokenRewardsABI from "@/lib/contracts/abis/TokenRewards.json";

const ABIS = {
  AccessManager: AccessManagerABI,
  DeviceRegistry: DeviceRegistryABI,
  IoTDataLedger: IoTDataLedgerABI,
  OracleIntegration: OracleIntegrationABI,
  TokenRewards: TokenRewardsABI,
};

export function useContract(contractName: keyof typeof CONTRACT_ADDRESSES) {
  const { address } = useAccount();

  const { data: balance, refetch: refetchBalance } = useContractRead({
    address: CONTRACT_ADDRESSES[contractName] as `0x${string}`,
    abi: ABIS[contractName].abi,
    functionName: "getRewardsBalance",
    args: [address],
    enabled: !!address,
  });

  const { writeAsync: claimRewards, isLoading } = useContractWrite({
    address: CONTRACT_ADDRESSES[contractName] as `0x${string}`,
    abi: ABIS[contractName].abi,
    functionName: "claimRewards",
  });

  const { writeAsync: registerDevice } = useContractWrite({
    address: CONTRACT_ADDRESSES[contractName] as `0x${string}`,
    abi: ABIS[contractName].abi,
    functionName: "registerDevice",
  });

  const { writeAsync: grantRole } = useContractWrite({
    address: CONTRACT_ADDRESSES[contractName] as `0x${string}`,
    abi: ABIS[contractName].abi,
    functionName: "grantRole",
  });

  return {
    balance: Number(balance || 0),
    claimRewards,
    registerDevice,
    grantRole,
    isLoading,
    refetchBalance,
  };
}
