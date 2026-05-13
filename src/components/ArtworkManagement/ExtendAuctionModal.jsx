import React from "react";

const ExtendAuctionModal = ({
    show,
    onClose,
    onSubmit,
    newEndTime,
    setNewEndTime
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-art-navy-100/80 backdrop-blur-sm">

            <div className="bg-white dark:bg-art-navy-80 border border-art-gold-100 p-8 max-w-md w-full shadow-2xl">

                <h3 className="font-serif italic text-2xl mb-6 text-art-navy-100 dark:text-art-gold-100">
                    Extend Auction
                </h3>

                <form onSubmit={onSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold">
                            New End Date & Time
                        </label>

                        <input
                            type="datetime-local"
                            required
                            value={newEndTime}
                            onChange={(e) => setNewEndTime(e.target.value)}
                            className="w-full bg-transparent border-b border-art-gold-20 py-2 outline-none"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">

                        <button
                            type="submit"
                            className="flex-1 py-3 bg-art-gold-100 text-art-navy-100 font-bold uppercase text-xs tracking-widest"
                        >
                            Confirm
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border border-art-gold-20 font-bold uppercase text-xs"
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default ExtendAuctionModal;