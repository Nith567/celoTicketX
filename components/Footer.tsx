import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full text-center py-3 border-t bg-black text-white mt-10 text-xs opacity-80">
    &copy; {new Date().getFullYear()} CeloTicketX. Built for MiniPay.
  </footer>
);

export default Footer;
