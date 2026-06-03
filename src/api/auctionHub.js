import { HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
const createConnection = (auctionId, token, onBidReceived) => {
    const connection = new HubConnectionBuilder()
        .withUrl('http://localhost:5000/bidAuction', {
            accessTokenFactory: () => token
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

    connection.on('PlaceBid', (data) => {
        console.log('New bid received:', data);
        if (onBidReceived) {
            onBidReceived(data);
        }
    });
    const startConnection = async () => {
        try {
            await connection.start();
            console.log('Connected to auction hub');

            await connection.invoke('JoinAuction', auctionId.toString());
            console.log(`Joined auction ${auctionId}`);
        } catch (err) {
            console.error('Error starting connection:', err);
        }
    };

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