import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full text-center py-3 border-t bg-black text-white mt-10 text-xs opacity-80">
    &copy; {new Date().getFullYear()} CeloTicketX. Built for MiniPay.
    — all powered by on-chain Mento FX.<br />
    Seamless, global, and borderless ticketing for everyone.
  </footer>
);

export default Footer;
