export interface Auction {
	id: number;
	image: string;
	title: string;
	description: string;
	artist: string;
	startDate: string;
	endDate: string;
	currentBid: number;
	category: string;
}

export const auctionItems: Auction[] = [
	{
		id: 1,
		image: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NzM0ODg3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		title: "Vintage Luxury Watch",
		description:
			"Rare 1960s timepiece in pristine condition. Features automatic movement and original leather strap.",
		artist: "Patek Philippe",
		startDate: "2026-03-10",
		endDate: "2026-03-20",
		currentBid: 15000,
		category: "Romanian",
	},
	{
		id: 2,
		image: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhfGVufDF8fHx8MTc3MzQxNzI3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		title: "Classic Film Camera",
		description:
			"Professional-grade vintage camera with original case. Perfect for collectors and photography enthusiasts.",
		artist: "Leica",
		startDate: "2026-03-12",
		endDate: "2026-03-22",
		currentBid: 3500,
		category: "Islamic",
	},
	{
		id: 3,
		image: "https://images.unsplash.com/photo-1734549097855-9987c39ce651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnR3b3JrJTIwcGFpbnRpbmd8ZW58MXx8fHwxNzczNDg4NzU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		title: "Contemporary Art Piece",
		description:
			"Stunning modern artwork by emerging artist. Mixed media on canvas, signed and authenticated.",
		artist: "Sarah Mitchell",
		startDate: "2026-03-14",
		endDate: "2026-03-24",
		currentBid: 8200,
		category: "Modern",
	},
	{
		id: 4,
		image: "https://images.unsplash.com/photo-1544691560-fc2053d97726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwZnVybml0dXJlfGVufDF8fHx8MTc3MzQxMzA2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		title: "Antique Wooden Chair",
		description:
			"Beautifully restored Victorian-era furniture. Handcrafted with intricate details and original upholstery.",
		artist: "Thomas Chippendale Co.",
		startDate: "2026-03-11",
		endDate: "2026-03-21",
		currentBid: 5600,
		category: "Niggers",
	},
	{
		id: 5,
		image: "https://images.unsplash.com/photo-1587750059638-e7e8c43b99fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwY2FyfGVufDF8fHx8MTc3MzQ4ODc1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		title: "Classic Sports Car",
		description:
			"Iconic vintage automobile in excellent condition. Fully serviced with documented history.",
		artist: "Porsche",
		startDate: "2026-03-13",
		endDate: "2026-03-23",
		currentBid: 125000,
		category: "WOW",
	},
	{
		id: 6,
		image: "https://images.unsplash.com/photo-1762049213134-008e36819c1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXJlJTIwY29pbnxlbnwxfHx8fDE3NzM0ODg3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		title: "Rare Collectible Coins",
		description:
			"Limited edition commemorative coins from early 20th century. Certified authentic with original packaging.",
		artist: "U.S. Mint",
		startDate: "2026-03-15",
		endDate: "2026-03-25",
		currentBid: 2400,
		category: "hehe",
	},
];
