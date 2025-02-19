import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Loader2, ExternalLink } from "lucide-react";
import { useContract } from "@/hooks/useContract";
import { useNotifications } from "@/components/ui/notifications";

interface Transaction {
  date: string;
  amount: number;
  hash: string;
}

const Rewards = () => {
  const { showNotification } = useNotifications();
  const { contract, signer } = useContract("TokenRewards");
  const [isLoading, setIsLoading] = React.useState(false);
  const [balance, setBalance] = React.useState(150);
  const [transactions, setTransactions] = React.useState<Transaction[]>([
    { date: "2024-03-20", amount: 50, hash: "0x1234...5678" },
    { date: "2024-03-19", amount: 30, hash: "0x5678...9012" },
    { date: "2024-03-18", amount: 70, hash: "0x9012...3456" },
  ]);

  const handleClaimRewards = async () => {
    if (!contract) return;

    try {
      setIsLoading(true);
      const tx = await contract.claimRewards();
      await tx.wait();

      if (signer) {
        const address = await signer.getAddress();
        const newBalance = await contract.getRewardsBalance(address);
        setBalance(Number(newBalance));
        showNotification(`Successfully claimed ${balance} tokens!`, "success");
      }
    } catch (error) {
      console.error("Error claiming rewards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-6 h-6 text-yellow-400" />
            Token Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-2xl font-bold">{balance} Tokens</div>
              <Button
                onClick={handleClaimRewards}
                disabled={isLoading || balance === 0}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Claiming...
                  </>
                ) : (
                  "Claim Rewards"
                )}
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Transaction History</h3>
              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div
                    key={tx.hash}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        {tx.date}
                      </div>
                      <div className="font-medium">{tx.amount} Tokens</div>
                    </div>
                    <a
                      href={`https://etherscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rewards;
