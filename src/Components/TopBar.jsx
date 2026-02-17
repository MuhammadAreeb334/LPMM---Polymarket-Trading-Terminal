import React from "react";
import { Sun, Moon, Wallet } from "lucide-react";
import { useTheme } from "../Context/ThemeContext";

const TopBar = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="px-4 py-3 bg-white dark:bg-primary-dark shadow-sm transition-colors border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 cursor-pointer">
          LPMM
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="flex items-center gap-2 text-xs sm font-medium px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer">
            <Wallet size={18} />
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
