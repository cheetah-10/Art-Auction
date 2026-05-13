import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function PendingUserInfo({ setShowPendingModal }) {
  const navigate = useNavigate();
  const onclose = () => {
    setShowPendingModal(false);
    navigate('/');
  }
  return (
    <div>

      <div className="fixed inset-0 bg-art-navy-100/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
        <div className="bg-white dark:bg-art-navy-80 max-w-md w-full p-8 text-center border-t-4 border-art-gold-100 shadow-2xl animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-art-gold-20 text-art-gold-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            🎨
          </div>
          <h3 className="font-serif text-2xl italic text-art-navy-100 dark:text-white mb-4">Application Received</h3>
          <p className="text-art-navy-60 dark:text-art-navy-40 text-sm leading-relaxed mb-8">
            Thank you for joining our creative community. To maintain the quality of our gallery, all artist accounts are reviewed by our curators.
            <br /><br />
            <span className="font-bold text-art-gold-100">Status: Pending Approval</span>
          </p>
          <button
            onClick={onclose}
            className="px-8 py-2 border border-art-gold-100 text-art-gold-100 hover:bg-art-gold-100 hover:text-white transition-all uppercase text-xs font-bold tracking-widest cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  )
}
