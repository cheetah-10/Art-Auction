import React from 'react';
import { Link } from 'react-router-dom';
import { MoveLeft, Search, Paintbrush } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#FDFDFD] dark:bg-art-navy-100 flex items-center justify-center px-6 py-24 relative overflow-hidden">
            
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <div className="absolute top-10 left-10 text-[20rem] font-serif italic text-art-navy-100">4</div>
                <div className="absolute bottom-10 right-10 text-[20rem] font-serif italic text-art-navy-100">4</div>
            </div>

            <div className="max-w-2xl w-full text-center relative z-10">
                {/* Visual Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="w-32 h-44 border-2 border-art-gold-100 border-dashed flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
                            <Paintbrush size={48} className="text-art-gold-20" />
                        </div>
                        <div className="absolute -top-4 -right-4 bg-art-terracotta-100 text-white p-2 rounded-full shadow-xl animate-bounce">
                            <Search size={20} />
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="font-serif text-8xl md:text-9xl italic text-art-navy-100 dark:text-white mb-4">
                    404
                </h1>
                
                <h2 className="text-xl md:text-2xl uppercase tracking-[0.4em] font-bold text-art-gold-100 mb-6">
                    The Masterpiece is Missing
                </h2>
                
                <p className="text-art-navy-60 dark:text-art-navy-40 mb-12 max-w-md mx-auto leading-relaxed">
                    May be the artwork has already been sold or it hasn't been listed in our gallery yet. Perhaps you'd like to return to the main auction hall?
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link 
                        to="/" 
                        className="flex items-center gap-2 px-8 py-4 bg-art-navy-100 dark:bg-art-gold-100 text-white dark:text-art-navy-100 font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-lg hover:-translate-y-1"
                    >
                        <MoveLeft size={16} />
                        Back to Gallery
                    </Link>
                    
                    <Link 
                        to="/auctions" 
                        className="px-8 py-4 border border-art-navy-100 dark:border-art-gold-100 text-art-navy-100 dark:text-art-gold-100 font-bold uppercase tracking-widest text-xs hover:bg-art-navy-10 dark:hover:bg-art-gold-10 transition-all shadow-sm hover:-translate-y-1"
                    >
                        Explore Auctions
                    </Link>
                </div>

                {/* Footer Quote */}
                <div className="mt-20 border-t border-art-gold-20 pt-8">
                    <p className="font-serif italic text-art-navy-40 text-sm">
                        "Art is never finished, only abandoned." — Leonardo da Vinci
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;