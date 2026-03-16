import { useParams } from "react-router-dom";
import Bid from "./Bid";

const bidHistory = {
	1: [
		{
			id: 1,
			userId: 1,
			userName: "James Wilson",
			amount: 15000,
			timestamp: "2026-03-15T14:30:00",
		},
		{
			id: 2,
			userId: 2,
			userName: "Emily Chen",
			amount: 14500,
			timestamp: "2026-03-15T12:15:00",
		},
		{
			id: 3,
			userId: 3,
			userName: "Michael Brown",
			amount: 14000,
			timestamp: "2026-03-14T16:45:00",
		},
		{
			id: 4,
			userId: 4,
			userName: "Sarah Davis",
			amount: 13500,
			timestamp: "2026-03-14T10:20:00",
		},
		{
			id: 5,
			userId: 1,
			userName: "James Wilson",
			amount: 13000,
			timestamp: "2026-03-13T18:00:00",
		},
	],
	2: [
		{
			id: 1,
			userId: 5,
			userName: "David Martinez",
			amount: 3500,
			timestamp: "2026-03-15T11:00:00",
		},
		{
			id: 2,
			userId: 6,
			userName: "Lisa Anderson",
			amount: 3200,
			timestamp: "2026-03-14T19:30:00",
		},
		{
			id: 3,
			userId: 7,
			userName: "Robert Taylor",
			amount: 3000,
			timestamp: "2026-03-14T14:15:00",
		},
		{
			id: 4,
			userId: 5,
			userName: "David Martinez",
			amount: 2800,
			timestamp: "2026-03-13T09:45:00",
		},
	],
	3: [
		{
			id: 1,
			userId: 8,
			userName: "Jennifer Lee",
			amount: 8200,
			timestamp: "2026-03-15T15:20:00",
		},
		{
			id: 2,
			userId: 9,
			userName: "Christopher Moore",
			amount: 8000,
			timestamp: "2026-03-15T08:10:00",
		},
		{
			id: 3,
			userId: 10,
			userName: "Amanda White",
			amount: 7500,
			timestamp: "2026-03-14T13:30:00",
		},
		{
			id: 4,
			userId: 8,
			userName: "Jennifer Lee",
			amount: 7200,
			timestamp: "2026-03-13T16:00:00",
		},
		{
			id: 5,
			userId: 11,
			userName: "Daniel Harris",
			amount: 7000,
			timestamp: "2026-03-13T11:45:00",
		},
	],
	4: [
		{
			id: 1,
			userId: 12,
			userName: "Jessica Thompson",
			amount: 5600,
			timestamp: "2026-03-15T13:40:00",
		},
		{
			id: 2,
			userId: 13,
			userName: "Matthew Garcia",
			amount: 5400,
			timestamp: "2026-03-15T10:25:00",
		},
		{
			id: 3,
			userId: 14,
			userName: "Ashley Martinez",
			amount: 5000,
			timestamp: "2026-03-14T17:15:00",
		},
		{
			id: 4,
			userId: 12,
			userName: "Jessica Thompson",
			amount: 4800,
			timestamp: "2026-03-14T09:30:00",
		},
	],
	5: [
		{
			id: 1,
			userId: 15,
			userName: "Joshua Robinson",
			amount: 125000,
			timestamp: "2026-03-15T16:50:00",
		},
		{
			id: 2,
			userId: 16,
			userName: "Nicole Clark",
			amount: 120000,
			timestamp: "2026-03-15T14:00:00",
		},
		{
			id: 3,
			userId: 17,
			userName: "Andrew Lewis",
			amount: 115000,
			timestamp: "2026-03-14T20:30:00",
		},
		{
			id: 4,
			userId: 15,
			userName: "Joshua Robinson",
			amount: 110000,
			timestamp: "2026-03-14T12:10:00",
		},
		{
			id: 5,
			userId: 18,
			userName: "Stephanie Walker",
			amount: 105000,
			timestamp: "2026-03-13T15:45:00",
		},
		{
			id: 6,
			userId: 16,
			userName: "Nicole Clark",
			amount: 100000,
			timestamp: "2026-03-13T08:20:00",
		},
	],
	6: [
		{
			id: 1,
			userId: 19,
			userName: "Brandon Hall",
			amount: 2400,
			timestamp: "2026-03-15T12:30:00",
		},
		{
			id: 2,
			userId: 20,
			userName: "Samantha Allen",
			amount: 2300,
			timestamp: "2026-03-14T18:45:00",
		},
		{
			id: 3,
			userId: 21,
			userName: "Tyler Young",
			amount: 2200,
			timestamp: "2026-03-14T11:20:00",
		},
		{
			id: 4,
			userId: 19,
			userName: "Brandon Hall",
			amount: 2000,
			timestamp: "2026-03-13T14:00:00",
		},
	],
};

function BidsLayout() {
	// auction/:id/bids      # fetch the correct data using auctionId
	// bidsArray[auctionId] is DEMO, remove [auctionId] cus bidsArray will get the fetched data
	const { id: auctionId } = useParams();

	const bidsArray = bidHistory;

	return (
		<div className="flex flex-col gap-6">
			{/* <div className="grid grid-cols-3 gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1"> */}
			{bidsArray[auctionId].map((item) => (
				<Bid key={item.id} item={item} />
			))}
			{/* </div> */}
		</div>
	);
}

export default BidsLayout;
