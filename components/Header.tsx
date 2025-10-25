
import React from 'react';
import { User } from '../types';
import { AppLogo } from '../constants';

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onLogoutClick }) => {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <AppLogo />
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-slate-700 hidden sm:inline">Welcome, {user.name.split(' ')[0]}</span>
              <button
                onClick={onLogoutClick}
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
