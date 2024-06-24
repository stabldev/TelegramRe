import { createSignal, onCleanup, onMount } from "solid-js";
import SocketEndpoints from "~/endpoints/socket/socket-endpoints";
import type { WebSocketData } from "~/types/WebSocket";

export const useWebSocket = (onMessage: (data: WebSocketData) => void) => {
  const [socket, setSocket] = createSignal<WebSocket>();

  onMount(() => {
    const ws = new WebSocket(SocketEndpoints.CHAT);
    setSocket(ws);

    ws.onclose = () => {
      console.log("connection closed");
    };

    ws.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      onMessage(data);
    };

    onCleanup(() => {
      ws.close();
    });
  });

  return {
    socket
  };
};
