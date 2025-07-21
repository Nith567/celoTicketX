"use client";

import CreateEventForm from "@/components/CreateEventForm";
import Footer from "@/components/Footer";
import { useWeb3 } from "@/contexts/useWeb3";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {
    address,
    getUserAddress,
    getLatestCounter,
    createEvent,
  } = useWeb3();

  const router = useRouter();
  const [eventLoading, setEventLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getUserAddress();
  }, []);

  type CreateEventFormData = {
    name: string;
    details: string;
    stablecoin: string;
    price: string;
    imageIpfsUrl: File | null;
  };

  const handleCreateEvent = useCallback(
    async ({ name, details, stablecoin, price, imageIpfsUrl }: CreateEventFormData) => {
      if (!address) return;
      setEventLoading(true);
      try {
        const formDataText = new FormData();
        const file = new File([details], "event.txt", { type: "text/plain" });
        formDataText.append("file", file);
        const res = await axios.post("/api/texts", formDataText, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const detailsIpfs = `https://green-accurate-frog-295.mypinata.cloud/ipfs/${res.data}`;

        let imageIpfs = "";
        if (imageIpfsUrl) {
          const formData = new FormData();
          formData.append("file", imageIpfsUrl);
          const res = await axios.post("/api/files", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          imageIpfs = `https://green-accurate-frog-295.mypinata.cloud/ipfs/${res.data}`;
        }

        const tx = await createEvent(name, detailsIpfs, price, imageIpfs);
        const newEventId = await getLatestCounter();
        router.push(`/ticket/${newEventId}`);
      } catch (error) {
        console.error("Error creating event:", error);
      } finally {
        setEventLoading(false);
      }
    },
    [address, createEvent, router, getLatestCounter]
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-300 via-green-400 to-green-600">
      <main className="flex flex-1 flex-col items-center justify-center w-full px-2">
        {!address ? (
          <div className="h1 mt-10">Connecting...</div>
        ) : (
          <>
            {!showForm && (
              <div className="flex flex-col items-center justify-center text-center py-16 w-full">
                <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
                  Celo TicketX
                </h1>
                <p className="mb-8 text-lg text-green-900 max-w-xl">
                  Create events and sell tickets cross-chain!<br />
                  Users can buy tickets with a variety of stablecoins (JPY, GHS, CEUR, CUSD, and more)
                </p>
                <Button
                  title="create Event"
                  className="bg-gradient-to-r from-green-500 to-green-400 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:from-green-600 hover:to-green-500 transition-all duration-200"
                  onClick={() => setShowForm(true)}
                >
                  Create Event
                </Button>
              </div>
            )}
            {showForm && (
              <div className="w-full max-w-md mx-auto p-8 mt-8 mb-8 flex flex-col items-center">
                <CreateEventForm loading={eventLoading} onCreateEvent={handleCreateEvent} />
                <Button
                  title ="Cancel"
                  variant="outline"
                  className="mt-4 w-full border-green-400 text-green-700 hover:bg-green-50"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}