import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Badge from "../../ui/AuctionStatus.jsx";
import ArtworkData from "./ArtworkData.jsx";
import { useState } from "react";
import Modal from "../../ui/BidPopup.jsx";
import BidPopUpBody from "./BidPopUpBody.jsx";
import toast from "react-hot-toast";
import AuctionStatus from "../../ui/AuctionStatus.jsx";

function ArtworkDetails({ auction }) {
	const [showPopup, setShowPopup] = useState(false);
	const [bidAmount, setBidAmount] = useState("");
	const {artwork, category, tags, winner} = auction
	
	const minBidAmount = auction.currentBid + 10;
	const isBidValid = Number(bidAmount) >= minBidAmount;

	const navigate = useNavigate();

	if (!auction) {
		return (
			<div className="min-h-screen bg-background p-8 flex items-center justify-center">
				<div className="text-center">
					<h1 className="mb-4">Auction Not Found</h1>

					<Button onClick={() => navigate(-1)}>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Listings
					</Button>
				</div>
			</div>
		);
	}

	function handleSubmittedBid() {
		console.log("Submitted yaay");
		toast.success("Successfully toasted!");
		// POST v1/api/bids
		/*
			{
				user_id,
				auction_id,
				bid_amount,
				timestamp,
			}
		*/
		// POST REQUEST

		setBidAmount("");
	}

	function isActiveAuction() {
		const endDate = new Date(auction.auction_end_time);
		const now = new Date();
		return now < endDate;
	}

	return (
		<div className="bg-background">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Image Section */}
				<div className="aspect-square overflow-hidden rounded-lg border bg-card">
					<img
						src={artwork.image}
						alt={artwork.title}
						className="w-full h-full object-cover"
					/>
				</div>

				{/* Details Section */}
				<div className="flex flex-col gap-6">
					<div>
						<h1 className="mb-4 text-2xl">{artwork.title}</h1>

						<AuctionStatus auction={auction} />
						
					</div>

					<ArtworkData
						auction={auction}
						isActiveAuction={isActiveAuction}
					/>

					{/* Buttons */}
					{isActiveAuction() && (
						<div className="flex gap-4 mt-auto pt-6">
							<Button
								className="flex-1 bg-black text-white hover:opacity-75"
								size={"lg"}
								onClick={() => setShowPopup(true)}
							>
								Place Bid
							</Button>

							{/* Pop up */}
							{showPopup && (
								<Modal>
									<Modal.Header>
										Bid Amount
									</Modal.Header>
									<Modal.Body>
										<BidPopUpBody
											auction={auction}
											bidAmount={bidAmount}
											setBidAmount={
												setBidAmount
											}
											minBidAmount={
												minBidAmount
											}
										/>
									</Modal.Body>
									<Modal.Footer>
										<Button
											disabled={!isBidValid}
											className="bg-black text-white hover:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
											size="lg"
											onClick={() => {
												handleSubmittedBid();
												setShowPopup(false);
											}}
										>
											Bid
										</Button>
										<Button
											className="border hover:opacity-50"
											size="lg"
											onClick={() =>
												setShowPopup(false)
											}
										>
											CLOSE
										</Button>
									</Modal.Footer>
								</Modal>
							)}
							{/* End Pop up */}

							<Button
								className="border hover:bg-gray-300 "
								size={"lg"}
							>
								Watch Item
							</Button>
							<Button
								className=" bg-green-500 text-white hover:bg-green-300"
								size={"lg"}
							>
								Buy Now
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ArtworkDetails;
