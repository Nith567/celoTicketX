import React from "react";

interface HeaderProps {
  address?: string;
}

const Header: React.FC<HeaderProps> = ({ address }) => (
  <header className="w-full flex flex-col items-center py-4 border-b bg-black text-white">
    <h1 className="text-2xl font-bold tracking-tight">CeloTicketX</h1>
  </header>
);

export default Header;
