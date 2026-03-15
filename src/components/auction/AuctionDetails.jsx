import ArtworkDetails from "./ArtworkDetails.jsx";
import { auctionItems } from "../../data/auctions.js";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../ui/Button.jsx";
import { ArrowLeft, Calendar, DollarSign, UndoIcon, User } from "lucide-react";

export default function AuctionDetails() {
	const navigate = useNavigate();
	const { id: auctionId } = useParams();
	console.log(auctionId);
	/*
		FETCH LOGIC LATER
	*/
	const auction = auctionItems.find((item) => item.id === Number(auctionId));

	return (
		<div className="max-w-6xl mx-auto p-8">
			<Button
				onClick={() => navigate(-1)}
				className="mb-6 flex items-center"
			>
				<ArrowLeft className="mr-2 h-4 w-4" />
				Back to Listings
			</Button>
			<ArtworkDetails auction={auction} />;
		</div>
	);
}
