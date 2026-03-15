import { ArrowLeft, Calendar, DollarSign, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge.jsx";

function ArtworkDetails({ auction }) {
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

	const formatDate = (dateString) => {
		const date = new Date(dateString);

		return date.toLocaleDateString("en-US", {
			year: "numeric",

			month: "long",

			day: "numeric",
		});
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",

			currency: "USD",

			minimumFractionDigits: 0,

			maximumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<div className="bg-background">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Image Section */}
					<div className="aspect-square overflow-hidden rounded-lg border bg-card">
						<img
							src={auction.image}
							alt={auction.title}
							className="w-full h-full object-cover"
						/>
					</div>

					{/* Details Section */}
					<div className="flex flex-col gap-6">
						<div>
							<h1 className="mb-4">{auction.title}</h1>

							<Badge variant="secondary" className="mb-4">
								Active Auction
							</Badge>
						</div>

						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<User className="h-5 w-5 mt-1 text-muted-foreground" />

								<div>
									<p className="text-sm text-muted-foreground">
										Artist / Maker
									</p>

									<p>{auction.artist}</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<Calendar className="h-5 w-5 mt-1 text-muted-foreground" />

								<div>
									<p className="text-sm text-muted-foreground">
										Auction Period
									</p>

									<p>
										{formatDate(
											auction.startDate,
										)}{" "}
										-{" "}
										{formatDate(auction.endDate)}
									</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<DollarSign className="h-5 w-5 mt-1 text-muted-foreground" />

								<div>
									<p className="text-sm text-muted-foreground">
										Current Highest Bid
									</p>

									<p className="text-2xl font-semibold text-primary">
										{formatCurrency(
											auction.currentBid,
										)}
									</p>
								</div>
							</div>
						</div>

						<div className="border-t pt-6">
							<h3 className="mb-2">Description</h3>

							<p className="text-muted-foreground">
								{auction.description}
							</p>
						</div>

						<div className="flex gap-4 mt-auto pt-6">
							<Button
								className="flex-1 bg-black text-white hover:opacity-75"
								size={"lg"}
							>
								Place Bid
							</Button>

							<Button
								className="border-1 hover:bg-gray-300 "
								size={"lg"}
							>
								Watch Item
							</Button>
						</div>
					</div>
				</div>
			</div>
	);
}

export default ArtworkDetails;
