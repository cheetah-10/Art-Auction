import { HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
const createConnection = (auctionId, token, onBidReceived) => {
    const connection = new HubConnectionBuilder()
        .withUrl('http://localhost:5000/bidAuction', {
            accessTokenFactory: () => token
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

    //listener for receiving new bids
    connection.on('PlaceBid', (data) => {
        console.log('New bid received:', data);
        if (onBidReceived) {
            onBidReceived(data);
        }
    });
    // start the connection and join the auction group
    const startConnection = async () => {
        try {
            await connection.start();
            console.log('Connected to auction hub');

            // Join the auction group
            await connection.invoke('JoinAuction', auctionId.toString());
            console.log(`Joined auction ${auctionId}`);
        } catch (err) {
            console.error('Error starting connection:', err);
        }
    };

    //stop the connection and leave the auction group
    const stopConnection = async () => {
    try {

        if (connection.state === HubConnectionState.Connected) {

            await connection.invoke(
                'LeaveAuction',
                auctionId.toString()
            );

            await connection.stop();

            console.log('Disconnected from auction hub');
        }

    } catch (err) {
        console.error('Error stopping connection:', err);
    }
};

    return {
        connection,
        startConnection,
        stopConnection
    };
};

export default createConnection;