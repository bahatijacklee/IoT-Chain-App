import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Gift, ArrowRight, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useContract } from "@/hooks/useContract";

interface Transaction {
  date: string;
  amount: number;
  hash: string;
}

interface RewardWidgetProps {
  tokenBalance?: number;
  rewardsAvailable?: boolean;
  lastClaim?: string;
  transactions?: Transaction[];
}

const RewardWidget = ({
  tokenBalance: initialBalance = 150,
  rewardsAvailable = true,
  lastClaim = "2024-03-20",
  transactions = [
    { date: "2024-03-20", amount: 50, hash: "0x1234...5678" },
    { date: "2024-03-19", amount: 30, hash: "0x5678...9012" },
  ],
}: RewardWidgetProps) => {
  const { contract, signer } = useContract("TokenRewards");
  const [balance, setBalance] = useState(initialBalance);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (contract && signer) {
        try {
          const address = await signer.getAddress();
          const balance = await contract.getRewardsBalance(address);
          setBalance(Number(balance));
        } catch (error) {
          console.error("Error fetching rewards balance:", error);
        }
      }
    };

    fetchBalance();
  }, [contract, signer]);

  const handleClaimRewards = async () => {
    if (!contract) return;

    try {
      setIsLoading(true);
      const tx = await contract.claimRewards();
      await tx.wait();

      // Refresh balance after claiming
      if (signer) {
        const address = await signer.getAddress();
        const newBalance = await contract.getRewardsBalance(address);
        setBalance(Number(newBalance));
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error claiming rewards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[300px] h-[200px] bg-card text-card-foreground hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-purple-400" />
          <h3 className="font-semibold text-lg">Rewards</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="text-xl font-bold">{balance} Tokens</span>
          </div>

          <div className="text-sm text-gray-400">Last claimed: {lastClaim}</div>

          <div className="mt-2">
            <div className="text-sm font-medium mb-1">Recent Claims:</div>
            <div className="space-y-1 max-h-20 overflow-y-auto">
              {transactions.map((tx) => (
                <div
                  key={tx.hash}
                  className="text-xs flex justify-between items-center"
                >
                  <span>{tx.date}</span>
                  <span className="text-yellow-400">{tx.amount} Tokens</span>
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          </div>

          <Link to="/dashboard/rewards">
            <Button className="w-full text-white" variant="default">
              <span className="mr-2">Claim Rewards</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardWidget;
