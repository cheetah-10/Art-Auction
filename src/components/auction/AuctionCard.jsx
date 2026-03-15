import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { User } from "lucide-react";

export default function AuctionCard({ item }) {
	const { id, image, title, description, artist } = item;
	const navigate = useNavigate();

	function onCheckAuction() {
		navigate(`${id}`);
	}

	return (
		<div className="flex flex-col overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
			{/*  image */}
			<div className="aspect-[4/3] overflow-hidden">
				<img
					src={image}
					alt={title}
					className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</div>

			{/*  Artist */}

			<div className="flex gap-3 pt-6 py-3 pl-6">
				<User className="h-5 w-5 mt-1 text-muted-foreground" />
				<p>{artist}</p>
			</div>

			{/*  title & disc */}
			<div className="flex-1 p-6">
				<h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
					{title}
				</h3>
				<p className="text-gray-500">{description}</p>
			</div>

			{/*  check auction button */}
			<div className="px-6 pb-6 pt-0">
				<Button
					onClick={onCheckAuction}
					className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-white transition-colors bg-gray-950 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
				>
					Check Auction
				</Button>
			</div>
		</div>
	);
}
