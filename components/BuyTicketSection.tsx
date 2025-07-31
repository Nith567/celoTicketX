import React, { useState, useCallback, useMemo } from "react";

const TOKENS = [
  { name: "CUSD", address: "0x765DE816845861e75A25fCA122bb6898B8B1282a" },
  { name: "USDT", address: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e" },
  { name: "KES", address: "0x456a3D042C0DbD3db53D5489e98dFb038553B0d0" },
  { name: "COP", address: "0x8A567e2aE79CA692Bd748aB832081C45de4041eA" },
  { name: "GHS", address: "0xfAeA5F3404bbA20D3cc2f8C4B0A888F55a3c7313" },
  { name: "GBP", address: "0xCCF663b1fF11028f0b19058d0f7B674004a40746" },
  { name: "AUD", address: "0x7175504C455076F15c04A2F90a8e352281F492F9" },
  { name: "CAD", address: "0xff4Ab19391af240c311c54200a492233052B6325" },
  { name: "ZAR", address: "0x4c35853A3B4e647fD266f4de678dCc8fEC410BF6" },
  { name: "CHF", address: "0xb55a79F398E759E43C95b979163f30eC87Ee131D" },
  { name: "JPY", address: "0xc45eCF20f3CD864B32D9794d6f76814aE8892e20" },
  { name: "NGN", address: "0xE2702Bd97ee33c88c8f6f92DA3B733608aa76F71" },
];

interface BuyTicketSectionProps {
  eventId: number | null;
  loading: boolean;
  onBuyTicket: (data: { eventId: number; paymentToken: string; quantity: number }) => void;
}

const BuyTicketSection: React.FC<BuyTicketSectionProps> = React.memo(({ eventId, loading, onBuyTicket }) => {
  const [paymentToken, setPaymentToken] = useState(TOKENS[0].address);
  const [quantity, setQuantity] = useState(1);

  const tokenOptions = useMemo(() => TOKENS, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (eventId !== null) {
        onBuyTicket({ eventId, paymentToken, quantity });
      }
    },
    [eventId, paymentToken, quantity, onBuyTicket]
  );

  if (eventId === null) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-green-300 rounded-xl shadow p-4 w-full max-w-md flex flex-col gap-3 mt-6">
      <h2 className="text-lg font-semibold mb-2">Buy Ticket</h2>
      <div className="text-xs mb-1">Event ID: <span className="font-mono">{eventId}</span></div>
      <select className="border rounded px-2 py-1" value={paymentToken} onChange={e => setPaymentToken(e.target.value)} required>
        {tokenOptions.map(token => (
          <option key={token.address} value={token.address}>{token.name}</option>
        ))}
      </select>
      <input className="border rounded px-2 py-1" type="number" min={1} value={quantity} onChange={e => setQuantity(Number(e.target.value))} required />
      <button type="submit" className="bg-black text-white rounded px-4 py-2 mt-2" disabled={loading}>
        {loading ? "Buying..." : "Buy Ticket"}
      </button>
    </form>
  );
});

BuyTicketSection.displayName = 'BuyTicketSection';

export default BuyTicketSection; 