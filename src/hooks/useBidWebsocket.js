import { useEffect, useState } from "react";
import { WS_URL } from "../constants/constants";
import * as signalR from "@microsoft/signalr";
import { WEB_SOCKET } from "../constants/endPoint";
import toast from "react-hot-toast";

function useBidWebsocket(auction, isActiveAuction) {
	const [currentBid, setCurrentBid] = useState(auction.currentBidAmount);

	useEffect(() => {
		const connection = new signalR.HubConnectionBuilder()
			.withUrl(`${WS_URL}${WEB_SOCKET.bidPlaced}`)
			.configureLogging(signalR.LogLevel.None)
			.withAutomaticReconnect()
			.build();

		const startConnection = async () => {
			try {
				await connection.start();

				connection.on("PlaceBid", (newBid) => {
					if (+newBid.auctionId === +auction.id) {
						setCurrentBid(newBid.bidAmount);
						toast.success(`A bid was placed`, {position: "bottom-right"});
					}
				});
			} catch (err) {
				console.error("SignalR Connection Error: ", err);
			}
		};

		if (isActiveAuction()) {
			startConnection();
		}

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
