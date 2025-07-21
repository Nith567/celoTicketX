import React, { useMemo } from "react";
import Image from "next/image";

interface MyNFTsProps {
  tokenURIs: string[];
}

const MyNFTs: React.FC<MyNFTsProps> = React.memo(({ tokenURIs }) => {
  const nfts = useMemo(() => tokenURIs, [tokenURIs]);
  if (!nfts.length) return <div className="mt-5">You do not have any NFTs yet</div>;
  return (
    <div className="flex flex-col items-center justify-center w-full mt-7">
      <p className="font-bold">My NFTs</p>
      <div className="w-full grid grid-cols-2 gap-3 mt-3 px-2">
        {nfts.map((tokenURI, index) => (
          <div key={index} className="p-2 border-[3px] border-colors-secondary rounded-xl">
            <Image
              alt="MINIPAY NFT"
              src={tokenURI}
              className="w-[160px] h-[200px] object-cover"
              width={160}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

export default MyNFTs; 