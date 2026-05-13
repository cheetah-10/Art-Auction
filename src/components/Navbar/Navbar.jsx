import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { BellRing } from 'lucide-react';
import { NotificationContext } from '../../context/NotificationContex.jsx';
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { notLength } = useContext(NotificationContext)
  const userRole = user?.role || 'guest';
  const userName = user?.name || 'Guest';
  const navLinks = {
    guest: [
      { name: 'Auctions', path: '/auctions' },
      { name: 'Categories', path: '/categories' },
    ],
    buyer: [
      { name: 'Watchlist', path: '/watchlist' },
    ],
    artist: [
      { name: 'My Artworks', path: '/my-artworks' },
      { name: 'Add Artwork', path: '/upload-artwork' },

    ],
    admin: [
      { name: 'Dashboard', path: '/admin' },

    ]
  };

  const currentLinks = [...navLinks.guest];
  if (userRole === 'Buyer') currentLinks.push(...navLinks.buyer);
  if (userRole === 'Artist') currentLinks.push(...navLinks.artist);
  if (userRole === 'Admin') currentLinks.splice(0, currentLinks.length, ...navLinks.admin);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  }
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-art-navy-100/90 backdrop-blur-md border-b border-art-gold-20 dark:border-art-navy-60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <span className="text-2xl font-serif tracking-widest text-art-navy-100 dark:text-art-gold-100 font-bold italic">
              ART<span className="text-art-gold-100 dark:text-white">AUCTION</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center ">
            {currentLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-art-navy-80 dark:text-art-navy-40 hover:text-art-gold-100 dark:hover:text-art-gold-100 transition-colors duration-300 text-sm font-medium uppercase tracking-tighter"
              >
                {link.name}
              </a>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 ml-4 border-l border-art-gold-20 pl-6">
              {userRole === 'guest' ? (
                <>
                  <a href="/login" className="text-art-navy-100 dark:text-white text-sm font-semibold">Login</a>
                  <a href="/register" className="bg-art-gold-100 text-white px-5 py-2 rounded-sm hover:bg-art-navy-100 transition-all duration-300 text-sm font-semibold">
                    Register
                  </a>
                </>
              ) : (
                <>
                  <a href="/profile" className="text-art-navy-100 dark:text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-art-gold-20 border border-art-gold-100 flex items-center justify-center text-art-gold-100 font-bold">
                      {userName[0].toUpperCase()}
                    </div>
                  </a>
                  <a href="/notifications" className='relative top-1'>
                    <BellRing />
                    {notLength > 0 && <div className='absolute -top-4 -right-3 bg-art-gold-60 rounded-full w-5 h-5 flex items-center justify-center text-[14px] font-bold text-art-navy-100'>
                      {notLength}

                    </div>}

                  </a>
                  <button onClick={handleLogout} className="text-art-terracotta-100 text-sm font-semibold hover:underline">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex gap-3">

            <a href="/profile" className="text-art-navy-100 dark:text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-art-gold-20 border border-art-gold-100 flex items-center justify-center text-art-gold-100 font-bold">
                {userName[0].toUpperCase()}
              </div>
            </a>
            <a href="/notifications" className='relative top-2'>
              <BellRing />
              {notLength > 0 && <div className='absolute -top-4 -right-3 bg-art-gold-60 rounded-full w-5 h-5 flex items-center justify-center text-[14px] font-bold text-art-navy-100'>
                {notLength}

              </div>}

            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="text-art-navy-100 dark:text-white p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-art-navy-100 border-b border-art-gold-20 px-4 pt-2 pb-6 space-y-2">
          {currentLinks.map((link) => (
            <a key={link.name} href={link.path} className="block px-3 py-2 text-art-navy-80 dark:text-white hover:bg-art-gold-20 rounded-md">
              {link.name}
            </a>
          ))}
          <div className="flex items-center space-x-4 ml-4 border-l border-art-gold-20 pl-6">
            {userRole === 'guest' ? (
              <>
                <a href="/login" className="text-art-navy-100 dark:text-white text-sm font-semibold">Login</a>
                <a href="/register" className="bg-art-gold-100 text-white px-5 py-2 rounded-sm hover:bg-art-navy-100 transition-all duration-300 text-sm font-semibold">
                  Register
                </a>
              </>
            ) : (
              <>

                <button onClick={handleLogout} className="text-art-terracotta-100 text-sm font-semibold hover:underline">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;