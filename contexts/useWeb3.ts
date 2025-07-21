import { useState } from "react";
import StableTokenABI from "./cusd-abi.json";
import MinipayNFTABI from "./minipay-nft.json";
import CeloTicketXABI from "./CeloTicketX.json";
import {
    createPublicClient,
    createWalletClient,
    custom,
    getContract,
    http,
    parseEther,
    stringToHex,
} from "viem";
import { celo } from "viem/chains";

export const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
});

const cUSDTokenAddress: `0x${string}` = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"; // Testnet
const CeloTicket_Contract: `0x${string}` = "0xcBf795cbD25104eDF9431473935958aA066338BB";//Mainnet

export const useWeb3 = () => {
    const [address, setAddress] = useState<string | null>(null);

    const getUserAddress = async () => {
        if (typeof window !== "undefined" && window.ethereum) {
            let walletClient = createWalletClient({
                transport: custom(window.ethereum),
                chain: celo,
            });
            let [address] = await walletClient.getAddresses();
            setAddress(address);
        }
    };

    const sendCUSD = async (to: string, amount: string) => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celo,
        });

        let [address] = await walletClient.getAddresses();

        const amountInWei = parseEther(amount);

        const tx = await walletClient.writeContract({
            address: cUSDTokenAddress,
            abi: StableTokenABI.abi,
            functionName: "transfer",
            account: address,
            args: [to, amountInWei],
        });

        let receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };
    const createEvent = async (eventName:string,eventDetailsIpfs:string,pricePerPerson:string ,ipfsImageUrl:string) => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celo,
        });

        let [address] = await walletClient.getAddresses();
        const tx = await walletClient.writeContract({
            address: CeloTicket_Contract ,
            abi: CeloTicketXABI.abi,
            functionName: "createEvent",
            account: address,
            args: [eventName,eventDetailsIpfs,pricePerPerson,ipfsImageUrl]
        });

        let receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    const getLatestCounter = async (): Promise<bigint> => {
        const counter = await publicClient.readContract({
          address: CeloTicket_Contract,
          abi: CeloTicketXABI.abi,
          functionName: "eventCounter",
        });
        return BigInt(counter as string) 
      };



    const approveToken = async (tokenAddress: `0x${string}`, amount: string = "1000000000000000000000000") => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celo,
        });
        let [address] = await walletClient.getAddresses();

        const tx = await walletClient.writeContract({
            address: tokenAddress,
            abi: StableTokenABI.abi,
            functionName: "approve",
            account: address,
            args: [CeloTicket_Contract, amount],
        });

        let receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };


    // Buy ticket for an event
    const buyTicket = async (eventId: number, quantity: number, paymentToken: string) => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celo,
        });
        let [address] = await walletClient.getAddresses();

        const tx = await walletClient.writeContract({
            address: CeloTicket_Contract,
            abi: CeloTicketXABI.abi,
            functionName: "buyTicket",
            account: address,
            args: [eventId, quantity, paymentToken],
        });

        let receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    // Fetch event details by eventId
    const getEvent = async (eventId: number) => {
        const data = await publicClient.readContract({
            address: CeloTicket_Contract,
            abi: CeloTicketXABI.abi,
            functionName: 'getEvent',
            args: [eventId],
        });
        return data;
    };

    // Convert amount from cUSD to selected token using contract logic
    const convertAmount = async (fromToken: string, toToken: string, amount: bigint) => {
        const data = await publicClient.readContract({
            address: CeloTicket_Contract,
            abi: CeloTicketXABI.abi,
            functionName: 'convertAmount',
            args: [fromToken as `0x${string}`, toToken as `0x${string}`, amount],
        });
        return data;
    };

    return {
        address,
        getUserAddress,
        sendCUSD,
        createEvent,
        getLatestCounter,
        approveToken,
        buyTicket,
        getEvent,
        convertAmount,
    };
};
