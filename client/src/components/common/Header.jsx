import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import NavLink from './NavLink';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate('/');
  };

  const getUserInitials = () => {
    if (!user?.fullName) return 'U';
    const parts = user.fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return user.fullName.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="container flex justify-between items-center py-4 lg:py-8 px-2 mx-auto relative z-40">
      <div className="flex lg:flex-1">
        <NavLink
          href="/"
          className="flex gap-1 items-center lg:gap-2 group text-gray-900"
        >
          <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-rose-600 group-hover:rotate-12 transform transition duration-200" />
          <span className="font-extrabold text-lg lg:text-xl text-gray-900">Sommaire</span>
        </NavLink>
      </div>

      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        {isAuthenticated && (
          <NavLink href="/dashboard">Your Summaries</NavLink>
        )}
      </div>

      <div className="flex lg:justify-end lg:flex-1 items-center gap-3">
        {isAuthenticated ? (
          <div className="flex gap-3 items-center">
            <NavLink
              href="/upload"
              className="text-sm px-3 py-1.5 rounded-full border border-rose-300 text-rose-600 hover:bg-rose-50 font-medium"
            >
              Upload PDF
            </NavLink>
            <span className="px-2 py-0.5 text-xs font-semibold rounded bg-rose-100 text-rose-700">
              Pro
            </span>

            {/* User Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-rose-700 text-white flex items-center justify-center text-xs font-bold shadow">
                  {getUserInitials()}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-40 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user?.fullName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <UserIcon className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <NavLink href="/sign-in" className="text-sm font-medium">
              Sign in
            </NavLink>
            <Link to="/sign-up">
              <Button
                size="sm"
                className="rounded-full bg-rose-600 hover:bg-rose-700 text-white px-4"
              >
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
