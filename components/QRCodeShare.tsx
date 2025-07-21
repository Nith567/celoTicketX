import React, { useMemo } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QRCodeShareProps {
  url: string;
}

const QRCodeShare: React.FC<QRCodeShareProps> = React.memo(({ url }) => {
  const qr = useMemo(() =>   <QRCodeCanvas  value={url} size={100}  fgColor="#2E74FF" />, [url]);
  return (
    <div className="flex flex-col items-center mt-6">
      <span className="mb-2 text-sm">Share this event</span>
      {qr}
    </div>
  );
});

export default QRCodeShare; 