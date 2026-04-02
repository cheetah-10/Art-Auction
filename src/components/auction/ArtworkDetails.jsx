import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../ui/Button";
import ArtworkData from "./ArtworkData.jsx";
import { useEffect, useState } from "react";
import Modal from "../../ui/BidPopup.jsx";
import BidPopUpBody from "./BidPopUpBody.jsx";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider.jsx";
import useActionLoginProtection from "../../hooks/useActionLoginProtection.js";
import apiClient from "../../utils/apiClient.js";
import { API } from "../../constants/endPoint.js";
import useFetch from "../../hooks/useFetch.js";

function ArtworkDetails({ auction }) {
	const [showPopup, setShowPopup] = useState(false);
	const [bidAmount, setBidAmount] = useState("");
	const [isWatchlisted, setIsWatchlisted] = useState(false);
	const { artwork, currentBidAmount } = auction;
	const [maxCurrnetBid, setMaxCurrnetBid] = useState(currentBidAmount);

	const { user, isAuthenticated } = useAuth();
	const { id: auctionId } = useParams();

	const { data: myWatchList } = useFetch(
		isAuthenticated ? API.USER.GET_MY_WATCHLIST : null,
	);

	// Check if auction is added to watchlist
	useEffect(
		function () {
			function checkWatchListed() {
				if (isAuthenticated)
					setIsWatchlisted(
						myWatchList.some(
							(e) => +e.auctionId === +auction.id,
						),
					);
			}
			checkWatchListed();
		},
		[myWatchList, auction.id],
	);

	// to protect buttons, this hook is used to return a function.
	// pass the message to this function.
	const actionLoginProtection = useActionLoginProtection();
	const message = "Please log in to do this action";

	const minBidAmount = +maxCurrnetBid + 10;
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
		apiClient
			.post(`${API.BIDS.POST_NEW_BID}`, {
				userId: user.id,
				auctionId: auctionId,
				bidAmount: bidAmount,
				timestamp: new Date().toISOString(),
			})
			.catch((err) => console.log(err.response));

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

		setMaxCurrnetBid(bidAmount);
		setBidAmount("");
	}

	function isActiveAuction() {
		const endDate = new Date(auction.auctionEndTime);
		const now = new Date();
		return now < endDate;
	}

	function addToWatchlist() {
		if (isAuthenticated)
			try {
				apiClient.post(
					`${API.AUCTION.ADD_TO_WATCHLIST}${auctionId}`,
				);
				setIsWatchlisted(true);
			} catch (error) {
				toast.error(error.message);
			}
	}

	function removeFromWatchlist() {
		try {
			apiClient.delete(`${API.AUCTION.ADD_TO_WATCHLIST}${auctionId}`);
			setIsWatchlisted(false);
		} catch (error) {
			toast.error(error.message);
		}
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
			{/* Image Section */}
			<div className="aspect-square overflow-hidden rounded-lg border bg-card">
				<img
					src={artwork.artworkImage}
					alt={artwork.title}
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Details Section */}
			<div className="flex flex-col gap-6">
				<ArtworkData
					auction={auction}
					isActiveAuction={isActiveAuction}
				/>

				{/* Buttons */}
				<div className="flex gap-4 mt-auto">
					{/* placebid button */}
					{isActiveAuction() && (
						<Button
							className="flex-1 bg-black text-white hover:opacity-75"
							size={"lg"}
							onClick={() => {
								actionLoginProtection(message);
								setShowPopup(isAuthenticated);
							}}
						>
							Place Bid
						</Button>
					)}

					{/* pop up */}
					{showPopup && (
						<Modal>
							<Modal.Header>Bid Amount</Modal.Header>
							<Modal.Body>
								<BidPopUpBody
									bidAmount={bidAmount}
									setBidAmount={setBidAmount}
									minBidAmount={minBidAmount}
									maxCurrnetBid={maxCurrnetBid}
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
									onClick={() => setShowPopup(false)}
								>
									CLOSE
								</Button>
							</Modal.Footer>
						</Modal>
					)}

					{/* watchlist button */}
					{!isWatchlisted && (
						<Button
							className="border hover:bg-gray-300 "
							size={"lg"}
							onClick={() => {
								actionLoginProtection(message);
								addToWatchlist();
							}}
						>
							Watch Item
						</Button>
					)}

					{isWatchlisted && (
						<Button
							className="border bg-amber-500 text-white hover:bg-amber-700 "
							size={"lg"}
							onClick={() => {
								actionLoginProtection(message);
								removeFromWatchlist();
							}}
						>
							Remove From Watchlist
						</Button>
					)}

					{/* buy now button */}
					{isActiveAuction() && (
						<Button
							className=" bg-green-500 text-white hover:bg-green-300"
							size={"lg"}
							onClick={() => {
								actionLoginProtection(message);
							}}
						>
							Buy Now
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

export default ArtworkDetails;
