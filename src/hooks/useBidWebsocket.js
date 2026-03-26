import { useEffect, useState } from "react";
import { WS_URL } from "../constants/constants";
import * as signalR from "@microsoft/signalr";
import { WEB_SOCKET } from "../constants/endPoint";

function useBidWebsocket(auction, isActiveAuction) {
	const [currentBid, setCurrentBid] = useState(auction.currentBidAmount);

	useEffect(() => {
		// 2. Build the connection.
		// Ensure WS_URL points to your .NET Hub endpoint (e.g., "http://localhost:5000/bidAction")
		const connection = new signalR.HubConnectionBuilder()
			.withUrl(`${WS_URL}${WEB_SOCKET.bidPlaced}`)
			.withAutomaticReconnect()
			.build();

		// 3. Start the connection and attach event listeners
		const startConnection = async () => {
			try {
				await connection.start();
				console.log("SignalR Connected to Auction:", auction.id);

				// Listen for the specific backend event containing the ID and the new amount
				connection.on("PlaceBid", (newBid) => {
					if (+newBid.auctionId === +auction.id) {
						setCurrentBid(newBid.bidAmount);
						console.log(newBid);
					}
				});
			} catch (err) {
				console.error("SignalR Connection Error: ", err);
			}
		};

		if (isActiveAuction()) {
			startConnection();
		}

		// 4. Memory management: Teardown connection on unmount
		return () => {
			if (connection.state === signalR.HubConnectionState.Connected) {
				connection.off("Bidplaced");
				connection.stop();
			}
		};
	}, [auction.id, isActiveAuction]);

	return { currentBid };
}

export default useBidWebsocket;
