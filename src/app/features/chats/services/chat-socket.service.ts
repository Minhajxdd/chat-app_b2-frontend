import { Injectable } from "@angular/core";
import { io, Socket } from 'socket.io-client';
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ChatSocketService {
    private socket: Socket;

    constructor() {
      this.socket = io(`${environment.back_end}/chats`, {
        withCredentials: true,
      });
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