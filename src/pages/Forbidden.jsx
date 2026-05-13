import React from 'react';
import { Link } from 'react-router-dom';
import { MoveLeft, ShieldOff, AlertTriangle } from 'lucide-react';

const Forbidden = () => {
    return (
        <div className="min-h-screen bg-[#FDFDFD] dark:bg-art-navy-100 flex items-center justify-center px-6 py-24 relative overflow-hidden">

            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <div className="absolute top-10 left-10 text-[18rem] font-serif italic text-art-navy-100">403</div>
                <div className="absolute bottom-10 right-10 text-[18rem] font-serif italic text-art-navy-100">403</div>
            </div>

            <div className="max-w-2xl w-full text-center relative z-10">

                {/* Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="w-32 h-44 border-2 border-art-terracotta-100 border-dashed flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
                            <ShieldOff size={48} className="text-art-terracotta-100" />
                        </div>

                        <div className="absolute -top-4 -right-4 bg-art-navy-100 text-white p-2 rounded-full shadow-xl animate-pulse">
                            <AlertTriangle size={20} />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h1 className="font-serif text-8xl md:text-9xl italic text-art-navy-100 dark:text-white mb-4">
                    403
                </h1>

                <h2 className="text-xl md:text-2xl uppercase tracking-[0.4em] font-bold text-art-terracotta-100 mb-6">
                    Access Denied
                </h2>

                {/* Important meaning text */}
                <p className="text-art-navy-60 dark:text-art-navy-40 mb-12 max-w-md mx-auto leading-relaxed">
                    You are signed in, but you don’t have permission to access this section.  
                    This area is restricted to users with elevated privileges.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

                    <Link
                        to="/"
                        className="flex items-center gap-2 px-8 py-4 bg-art-navy-100 dark:bg-art-gold-100 text-white dark:text-art-navy-100 font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-lg hover:-translate-y-1"
                    >
                        <MoveLeft size={16} />
                        Back to Home
                    </Link>

                    <Link
                        to="/profile"
                        className="px-8 py-4 border border-art-terracotta-100 text-art-terracotta-100 font-bold uppercase tracking-widest text-xs hover:bg-art-terracotta-10 transition-all shadow-sm hover:-translate-y-1"
                    >
                        Go to Profile
                    </Link>

                </div>

                {/* Footer */}
                <div className="mt-20 border-t border-art-gold-20 pt-8">
                    <p className="font-serif italic text-art-navy-40 text-sm">
                        "You may enter the gallery, but not every room is open to you."
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Forbidden;