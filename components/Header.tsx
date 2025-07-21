import React from "react";

interface HeaderProps {
  address?: string;
}

const Header: React.FC<HeaderProps> = ({ address }) => (
  <header className="w-full flex justify-center items-center py-6 bg-gradient-to-r from-green-400/80 via-green-300/80 to-green-200/80 shadow-md">
    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
      CeloTicketX
    </h1>
  </header>
);

export default Header;
