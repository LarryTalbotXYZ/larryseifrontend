import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import LARRY_ABI from './abi.json';

const LARRY_CONTRACT_ADDRESS = '0x888d81e3ea5E8362B5f69188CBCF34Fa8da4b888' as `0x${string}`;

export function useLarryContract() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // Read contract data
  const { data: totalSupply } = useReadContract({
    address: LARRY_CONTRACT_ADDRESS,
    abi: LARRY_ABI,
    functionName: 'totalSupply',
  });

  const { data: backing } = useReadContract({
    address: LARRY_CONTRACT_ADDRESS,
    abi: LARRY_ABI,
    functionName: 'getBacking',
  });

  // Calculate current price
  const currentPrice = totalSupply && backing 
    ? parseFloat(formatEther(backing as bigint)) / parseFloat(formatEther(totalSupply as bigint))
    : 0;

  // Contract write functions
  const buyLarry = (amount: string, receiver: `0x${string}`) => {
    writeContract({
      address: LARRY_CONTRACT_ADDRESS,
      abi: LARRY_ABI,
      functionName: 'buy',
      args: [receiver],
      value: parseEther(amount),
    });
  };

  const sellLarry = (amount: string) => {
    writeContract({
      address: LARRY_CONTRACT_ADDRESS,
      abi: LARRY_ABI,
      functionName: 'sell',
      args: [parseEther(amount)],
    });
  };

  const openLeverage = (ethAmount: string, days: number) => {
    writeContract({
      address: LARRY_CONTRACT_ADDRESS,
      abi: LARRY_ABI,
      functionName: 'leverage',
      args: [parseEther(ethAmount), BigInt(days)],
      value: parseEther(ethAmount), // This should include fees
    });
  };

  const createLoan = (ethAmount: string, days: number) => {
    writeContract({
      address: LARRY_CONTRACT_ADDRESS,
      abi: LARRY_ABI,
      functionName: 'borrow',
      args: [parseEther(ethAmount), BigInt(days)],
    });
  };

  const repayLoan = (amount: string) => {
    writeContract({
      address: LARRY_CONTRACT_ADDRESS,
      abi: LARRY_ABI,
      functionName: 'repay',
      value: parseEther(amount),
    });
  };

  const closeLoan = (amount: string) => {
    writeContract({
      address: LARRY_CONTRACT_ADDRESS,
      abi: LARRY_ABI,
      functionName: 'closePosition',
      value: parseEther(amount),
    });
  };

  const flashClose = () => {
    writeContract({
      address: LARRY_CONTRACT_ADDRESS,
      abi: LARRY_ABI,
      functionName: 'flashClosePosition',
    });
  };

  const extendLoan = (days: string, feeAmount: bigint) => {
    const daysNum = parseInt(days);
    
    writeContract({
      address: LARRY_CONTRACT_ADDRESS,
      abi: LARRY_ABI,
      functionName: 'extendLoan',
      args: [BigInt(daysNum)],
      value: feeAmount,
    });
  };

  return {
    // Data
    totalSupply,
    backing,
    currentPrice,
    
    // Actions
    buyLarry,
    sellLarry,
    openLeverage,
    createLoan,
    repayLoan,
    closeLoan,
    flashClose,
    extendLoan,
    
    // Transaction state
    hash,
    isPending,
    isConfirming,
    isConfirmed,
  };
}

// Hook for getting user-specific data
export function useUserLarryData(address: `0x${string}` | undefined) {
  const { data: balance } = useReadContract({
    address: LARRY_CONTRACT_ADDRESS,
    abi: LARRY_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const { data: loanData } = useReadContract({
    address: LARRY_CONTRACT_ADDRESS,
    abi: LARRY_ABI,
    functionName: 'Loans',
    args: address ? [address] : undefined,
  });

  return {
    balance: balance ? formatEther(balance as bigint) : '0',
    loan: loanData && Array.isArray(loanData) && loanData.length >= 4 ? {
      collateral: formatEther(loanData[0] as bigint),
      borrowed: formatEther(loanData[1] as bigint),
      endDate: new Date(Number(loanData[2]) * 1000),
      numberOfDays: Number(loanData[3]),
    } : null,
  };
}

// Hook for calculating trade amounts
export function useTradeCalculations() {
  const useBuyAmount = (ethAmount: string) => {
    return useReadContract({
      address: LARRY_CONTRACT_ADDRESS,
      abi: LARRY_ABI,
      functionName: 'getBuyLARRY',
      args: ethAmount ? [parseEther(ethAmount)] : undefined,
    });
  };

  const useSellAmount = (larryAmount: string) => {
    return useReadContract({
      address: LARRY_CONTRACT_ADDRESS,
      abi: LARRY_ABI,
      functionName: 'LARRYtoETH',
      args: larryAmount ? [parseEther(larryAmount)] : undefined,
    });
  };

  const useLeverageFee = (ethAmount: string, days: number) => {
    return useReadContract({
      address: LARRY_CONTRACT_ADDRESS,
      abi: LARRY_ABI,
      functionName: 'leverageFee',
      args: ethAmount ? [parseEther(ethAmount), BigInt(days)] : undefined,
    });
  };

  const useExtensionFee = (borrowedAmount: string, days: number) => {
    return useReadContract({
      address: LARRY_CONTRACT_ADDRESS,
      abi: LARRY_ABI,
      functionName: 'getInterestFee',
      args: borrowedAmount && days ? [parseEther(borrowedAmount), BigInt(days)] : undefined,
    });
  };

  return {
    useBuyAmount,
    useSellAmount,
    useLeverageFee,
    useExtensionFee,
  };
}