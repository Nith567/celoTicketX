"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { useWeb3 } from "@/contexts/useWeb3";
import Image from 'next/image'
import QRCodeShare from '@/components/QRCodeShare';

const TOKENS = [
  { name: "CEUR", address: "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73" },
  { name: "CREAL", address: "0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787" },
  { name: "XOF", address: "0x73F93dcc49cB8A239e2032663e9475dd5ef29A08" },
  { name: "CUSD", address: "0x765DE816845861e75A25fCA122bb6898B8B1282a" },
  { name: "KES", address: "0x456a3D042C0DbD3db53D5489e98dFb038553B0d0" },
  { name: "GHS", address: "0xfAeA5F3404bbA20D3cc2f8C4B0A888F55a3c7313" },
  { name: "JPY", address: "0xc45eCF20f3CD864B32D9794d6f76814aE8892e20" },
  { name: "ZAR", address: "0x4c35853A3B4e647fD266f4de678dCc8fEC410BF6" },
];

const getIPFSUrl = (ipfsPath: string) => {
  const hash = ipfsPath.replace("ipfs://", "").trim();
  return `https://ipfs.io/ipfs/${hash}`;
};


export default function EventDetailsPage() {
  const { id } = useParams();
  const eventId = Number(id);
  const {
    getEvent,
    convertAmount,
    approveToken,
    buyTicket,
    address,
  } = useWeb3();



  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [buyLoading, setBuyLoading] = useState(false);
  const CUSD = TOKENS.find(t => t.name === "CUSD");
  const defaultTokenAddress = CUSD ? CUSD.address : TOKENS[0].address;
  const [paymentToken, setPaymentToken] = useState(defaultTokenAddress);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const hasFetchedEvent = useRef(false);
  const [eventDetailsText, setEventDetailsText] = useState<string>("");
      const [tx, setTx] = useState<any>(undefined);

  useEffect(() => {
    async function fetchEvent() {
      if (hasFetchedEvent.current || isNaN(eventId)) return;

      setLoading(true);
      setError("");
      hasFetchedEvent.current = true;

      try {
        const data = await getEvent(eventId);
        setEvent(data);

      } catch (e) {
        console.error("Failed to fetch event:", e);
        setError("Failed to fetch event details");
        hasFetchedEvent.current = false;
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);


  async function fetchEventDetailsText() {
    if (!event || !event[2]) return;
    //bafkreigishvi6yo2kzwd6onbgg5l4zlncczl3roljzfpcoajadjatlh3x4
    try {
      const response = await fetch(event[2]);
      const content = await response.text();

      setEventDetailsText(content);
    } catch (e) {
      setEventDetailsText("Failed to load event details from IPFS.");
    }
  }
  useEffect(() => {

    fetchEventDetailsText();
  }, [event]);

  const handleBuy = useCallback(async () => {
    if (!event || !quantity) return;

    setBuyLoading(true);
    setStatus("");
    setError("");

    try {
      await approveToken(paymentToken as `0x${string}`);
     const ticket= await buyTicket(eventId, quantity, paymentToken as `0x${string}`);
      setStatus("Ticket purchased successfully!");
      setTx(ticket.transactionHash)

    } catch (e: any) {
      console.error("Purchase failed:", e);
      setError(e?.message || "Failed to buy ticket");
    } finally {
      setBuyLoading(false);
    }
  }, [event, approveToken, buyTicket, eventId, quantity, paymentToken]);



  const selectedTokenName = TOKENS.find((t) => t.address === paymentToken)?.name || "Token";

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-64 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => {
            hasFetchedEvent.current = false;
            setError("");
            setLoading(true);
          }}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <h2 className="text-xl font-semibold text-gray-600">Event not found</h2>
        <p className="text-gray-500 mt-2">The event you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h1 className="text-3xl font-bold mb-3 text-gray-900">{event[1]}</h1>
        <div className="flex items-center mb-4 text-gray-600">
          <span className="text-sm">Created by:</span>
          <span className="font-mono text-sm ml-2 bg-gray-100 px-2 py-1 rounded">
            {event[0]}
          </span>
        </div>

        <div className="mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              event[6] ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {event[6] ? "Active" : "Inactive"}
          </span>
        </div>
        {event[5] && (
  <div className="mb-4">
    <Image
      src={(event[5])}
      alt={(event[5])}
      width={150}
      height={200}
      className="w-full max-w-md h-64 object-cover rounded-lg shadow-md"
    />
  </div>
)}

        <div className="space-y-3">
          <div>
            <span className="text-gray-600">Event Details:</span>
            <div className="ml-2 text-gray-800 whitespace-pre-wrap bg-gray-50 rounded p-2 mt-1 text-sm">
              {eventDetailsText || "Loading..."}
            </div>
          </div>
          <div>
            <span className="text-gray-600">Payment Token:</span>
            <span className="ml-2 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
              {event[3]}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Base Price:</span>
            <span className="ml-2 font-semibold">
            {(Number(event[4]) / 1e18).toFixed(4)} CUSD
            </span>
          </div>
        </div>
      <QRCodeShare url={typeof window !== 'undefined' ? window.location.href : ''} />
      </div>

      {event[6] && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Purchase Tickets</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Token
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={paymentToken}
                onChange={(e) => {
                  setPaymentToken(e.target.value);
                }}
              >
                {TOKENS.map((token) => (
                  <option key={token.address} value={token.address}>
                    {token.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="number"
                min={1}
                max={10}
                value={quantity}
                onChange={(e) => {
                  const val = Math.max(1, Number(e.target.value) || 1);
                  setQuantity(val);
                }}
              />
            </div>


            <button
              className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                buyLoading || !quantity
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              onClick={handleBuy}
              disabled={buyLoading || !quantity}
            >
              {buyLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                "Purchase Tickets"
              )}
            </button>

            {status && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {status}
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      {!event[6] && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mt-4">
          This event is currently inactive and tickets cannot be purchased.
        </div>
      )}
      {tx && (
        <div className="flex justify-center items-center mt-6">
          <p className="font-bold text-center">
            Tx Completed:{" "}
            <a
              href={`https://celo.blockscout.com/tx/${tx}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {tx.substring(0, 6)}...{tx.substring(tx.length - 6)}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
