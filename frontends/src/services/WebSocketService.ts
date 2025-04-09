// frontends/src/services/WebSocketService.ts
let socket: WebSocket;

export function connectWebSocket(onMessage: (msg: any) => void) {
  socket = new WebSocket("ws://localhost:3000");

  socket.onopen = () => console.log("WebSocket connected");

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    onMessage(message);
  };

  socket.onclose = () => console.log("WebSocket closed");
}

export function sendMessage(data: any) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  }
}
