import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-art-navy-100 text-art-navy-40 py-12 border-t-4 border-art-gold-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-serif tracking-widest text-white font-bold italic">
              ART<span className="text-art-gold-100">AUCTION</span>
            </span>
            <p className="mt-4 text-sm leading-6">
              The premier destination for discovering and bidding on world-class contemporary and classical art pieces.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-art-gold-100 font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/auctions" className="hover:text-white transition-colors">Live Auctions</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-art-gold-100 font-bold uppercase tracking-widest text-xs mb-6">Legal</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-art-gold-100 font-bold uppercase tracking-widest text-xs mb-6">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 border border-art-navy-60 flex items-center justify-center rounded-full hover:bg-art-gold-100 hover:text-white transition-all">
                𝕏
              </a>
              <a href="https://github.com" className="w-10 h-10 border border-art-navy-60 flex items-center justify-center rounded-full hover:bg-art-gold-100 hover:text-white transition-all">
                GH
              </a>
            </div>
            <p className="text-xs italic">Email: support@artauction.com</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-art-navy-80 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>Copyright © 2024 ArtAuction. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-art-gold-60 uppercase tracking-widest">Designed for Fine Art Curators</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;