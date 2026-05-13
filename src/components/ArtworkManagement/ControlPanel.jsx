const ControlPanel = ({
  auctionStatus,
  onStart,
  onClose,
  onExtend,
  onGetResult,
  setShowExtendModal
}) => {
  return (
    <div className="bg-white dark:bg-art-navy-80 border border-art-gold-20 p-6 space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-widest">
        Auction Controls
      </h3>

      <div className="grid gap-3">

        {auctionStatus === "NotStarted" && (
          <ControlButton
            onClick={onStart}
            icon={<Play size={16} />}
            label="Start Auction"
            color="bg-green-600"
          />
        )}

        {auctionStatus === "Active" && (
          <>
            <ControlButton
              onClick={onClose}
              icon={<XCircle size={16} />}
              label="Close Auction"
              color="bg-red-600"
            />

            <ControlButton
              onClick={() => setShowExtendModal(true)}
              icon={<Calendar size={16} />}
              label="Extend"
              color="bg-black"
            />
          </>
        )}

        {auctionStatus === "Sold" && (
          <ControlButton
            onClick={onGetResult}
            icon={<Trophy size={16} />}
            label="View Result"
            color="bg-blue-600"
          />
        )}

      </div>
    </div>
  );
};