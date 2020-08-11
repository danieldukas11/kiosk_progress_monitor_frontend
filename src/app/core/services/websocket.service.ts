import {Injectable} from '@angular/core';
import io from 'socket.io-client';
import {Observable} from 'rxjs';
import {SOCKET_CONFIG} from '../constants/global';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket;

  constructor() {
    console.log(SOCKET_CONFIG)
    this.socket = io(SOCKET_CONFIG.url, SOCKET_CONFIG.options);
  }

  emit(eventName: string, data: any = {}) {
    this.socket.emit(eventName, data);
  }

  on(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
}
