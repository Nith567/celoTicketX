"use client";

import Header from "@/components/Header";
import CreateEventForm from "@/components/CreateEventForm";
import Footer from "@/components/Footer";
import { useWeb3 } from "@/contexts/useWeb3";
import { useEffect, useState, useCallback } from "react";
import lighthouse from '@lighthouse-web3/sdk'
import { useRouter } from "next/navigation";
import axios from "axios";
export default function Home() {
  const {
    address,
    getUserAddress,
    getLatestCounter,
    createEvent,
  } = useWeb3();

  const router = useRouter();

  const [eventLoading, setEventLoading] = useState(false);

  useEffect(() => {
    getUserAddress();
  }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     const tokenURIs = await getNFTs();
  //     setUserOwnedNFTs(tokenURIs);
  //   };
  //   if (address) {
  //     getData();
  //   }
  // }, [address]);

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
          const detailsIpfs =`https://green-accurate-frog-295.mypinata.cloud/ipfs/${res.data}`;

        // const detailsUpload = await lighthouse.uploadText(
        //   details,
        //   process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!,
        //   details
        // );
        // const detailsIpfs = `ipfs://${detailsUpload.data.Hash}`;

        let imageIpfs = "";
        if (imageIpfsUrl) {

          const formData = new FormData();
          formData.append("file", imageIpfsUrl); // imageIpfsUrl should be a File object
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex flex-col items-center flex-1 w-full px-2">
        {!address ? (
          <div className="h1 mt-10">Connecting...</div>
        ) : (
          <CreateEventForm loading={eventLoading} onCreateEvent={handleCreateEvent} />
        )}
      </main>
      <Footer />
    </div>
  );
}