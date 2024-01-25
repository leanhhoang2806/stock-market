

const websocket = ({watchListId, setSocketData}) => {
    const socket = new WebSocket(`ws://localhost:5000?watchlist_id=${watchListId}`);

    socket.addEventListener('open', (event) => {
        console.log('WebSocket connected:', event);
    });
  
    // Listen for messages from the server
    socket.addEventListener('message', (event) => {
        const jsonData = JSON.parse(event.data)
        setSocketData(jsonData.results)
    });
  
    // Connection closed
    socket.addEventListener('close', (event) => {
        console.log('WebSocket disconnected:', event);
    });

}

export default websocket;