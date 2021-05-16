import { io, Socket } from 'socket.io-client';

export default class WebsocketService {
  private socket: Socket;

  constructor(baseUrl: string) {
    this.socket = io(baseUrl, {
      withCredentials: true,
      autoConnect: false
    });
  }

  connect(): void {
    if (this.socket.disconnected) {
      this.socket.connect();
    }
  }

  disconnect(): void {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  emit(event: string, ...args: any[]): void {
    this.socket.emit(event, ...args);
  }

  on(event: string, listener: (...args: any[]) => void): void {
    this.socket.on(event, listener);
  }

  onAny(listener: (...args: any[]) => void): void {
    this.socket.onAny(listener);
  }
}
