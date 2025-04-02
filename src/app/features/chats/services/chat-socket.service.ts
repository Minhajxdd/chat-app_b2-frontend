import { Injectable } from "@angular/core";
import { io, Socket } from 'socket.io-client';
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {
  private socket!: Socket;

  constructor() {
    this.initSocket();
  }

  private initSocket() {
    
    const token = localStorage.getItem('access_token');
    
    this.socket = io(`${environment.back_end}/chats`, {
      withCredentials: true,
      auth: {
        token: token
      }
    });

    const originalEmit = this.socket.emit;
    this.socket.emit = (event: string, data: any, ...args: any[]) => {
      
      const token = localStorage.getItem('access_token');
      
      if (data && typeof data === 'object') {
        data.token = token;
      } else {
        
        data = { payload: data, token: token };
      }
      
      return originalEmit.call(this.socket, event, data, ...args);
    };
  }
  
  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
  
  on(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
    });
  }
  
  connect() {
    this.socket.connect();
  }
  
  disconnect() {
    this.socket.disconnect();
  }
}
