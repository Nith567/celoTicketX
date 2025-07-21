import React, { useState, useCallback, useMemo } from "react";
import { parseEther } from "viem";

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

interface CreateEventFormProps {
  loading: boolean;
  onCreateEvent: (data: {
    name: string;
    details: string;
    stablecoin: string;
    price: string;
    imageIpfsUrl: File | null;
  }) => void;
}

const CreateEventForm: React.FC<CreateEventFormProps> = React.memo(({ loading, onCreateEvent }) => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [stablecoin, setStablecoin] = useState(TOKENS[0].address);
  const [price, setPrice] = useState("");
  const [imageIpfsUrl, setImageIpfsUrl] = useState<File | null>(null);

  const tokenOptions = useMemo(() => TOKENS, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !details.trim() || !price.trim()) {
        alert("Please fill in all required fields");
        return;
      }
      
      onCreateEvent({
        name: name.trim(),
        details: details.trim(),
        stablecoin: "0x765DE816845861e75A25fCA122bb6898B8B1282a", // force using CUSD
        price: parseEther(price).toString(),
        imageIpfsUrl
      });
    },
    [name, details, stablecoin, price, imageIpfsUrl, onCreateEvent]
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-4 w-full max-w-md flex flex-col gap-3 mt-6">
      <h2 className="text-lg font-semibold mb-2">Create Event</h2>
      
      <input 
        className="border rounded px-2 py-1" 
        placeholder="Event Name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        required 
      />
      
      <textarea 
        className="border rounded px-2 py-1 min-h-[100px]" 
        placeholder="Event Details" 
        value={details} 
        onChange={e => setDetails(e.target.value)} 
        required 
      />
      
      <input 
        className="border rounded px-2 py-1 bg-gray-100" 
        value="CUSD" 
        disabled 
      />
      
      <input
        className="border rounded px-2 py-1"
        placeholder="Price per Person (e.g. 0.002)"
        value={price}
        onChange={e => setPrice(e.target.value)}
        type="number"
        step="0.0001"
        min="0"
        required
      />
      
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Upload</label>
        <input
          className="border rounded px-2 py-1"
          type="file"
          accept="image/*"
          onChange={e => setImageIpfsUrl(e.target.files ? e.target.files[0] : null)}
        />
      </div>
      
      <button 
        type="submit" 
        className="bg-black text-white rounded px-4 py-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed" 
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
});

CreateEventForm.displayName = "CreateEventForm";

export default CreateEventForm;