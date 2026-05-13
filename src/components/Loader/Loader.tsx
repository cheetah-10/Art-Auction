import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      {/* Container اللوحة */}
      <div className="relative w-24 h-32 border-4 border-art-navy-100 dark:border-art-gold-40 p-1 flex items-end">
        
        {/* تأثير تعبئة اللوحة باللون الذهبي من الأسفل للأعلى */}
        <div className="w-full bg-art-gold-100 animate-[draw_2s_ease-in-out_infinite]"></div>
        
        {/* الفرشاة اللي بترسم (اختياري كشكل جمالي) */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-8 bg-art-terracotta-100 animate-bounce">
             <div className="absolute -top-1 left-[-2px] w-2 h-2 rounded-full bg-art-terracotta-100"></div>
        </div>

        {/* زوايا البرواز الفنية */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-art-gold-100"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-art-gold-100"></div>
      </div>

      {/* نص التحميل */}
      <div className="text-center">
        <h2 className="text-art-navy-100 dark:text-art-gold-100 font-serif italic tracking-[0.2em] text-lg animate-pulse">
          Curating Excellence...
        </h2>
        <p className="text-art-navy-40 text-xs uppercase mt-2 tracking-widest">Art Auction</p>
      </div>

      <style>{`
        @keyframes draw {
          0% { height: 0%; opacity: 0.3; }
          50% { height: 100%; opacity: 1; }
          100% { height: 0%; opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default Loader;