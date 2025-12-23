import React from "react";
import { Search } from "lucide-react";

const Navbar = ({ userInfo, onLogout, onSearchChange }) => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <h2 className="text-xl font-bold">Notes</h2>

      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search notes..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-gray-100 px-4 py-2 rounded-md outline-none"
          />
          <Search className="absolute right-3 top-2 h-4 w-4 text-gray-400" />
        </div>
      </div>

<div className="flex items-center gap-3">
  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
    {userInfo?.name
      ? userInfo.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "U"}
  </div>
  <button onClick={onLogout} className="text-sm text-red-500">
    Logout
  </button>
</div>
    </nav>
  );
};

export default Navbar;
