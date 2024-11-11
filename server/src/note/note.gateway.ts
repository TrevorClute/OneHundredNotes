import {
  BadRequestException,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  BaseWsExceptionFilter,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Note } from './Note.dto';
import { NoteValidationPipe } from './note-validation.pipe';
import { Interval } from '@nestjs/schedule';

@WebSocketGateway({
  cors: {
    // change once domain is established
    // origin: 'http://127.0.0.1:5500',
    origin: '*',
  },
})
export class NoteGateway {
  @WebSocketServer() server: Server;

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @SubscribeMessage('note-start')
  onStart(@MessageBody() note: Note): void {
    this.server.emit('note-start', note);
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @SubscribeMessage('note-stop')
  onStop(@MessageBody() note: Note): void {
    this.server.emit('note-stop', note);
  }
}
