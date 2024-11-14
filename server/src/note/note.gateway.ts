import {
  BadRequestException,
  UseFilters,
  UseGuards,
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
import { NoteThrottlerGuard } from './note.throttler.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@WebSocketGateway({
  cors: {
    // change once domain is established
    origin: '*',
  },
})
export class NoteGateway {
  @WebSocketServer() server: Server;

  // @UseGuards(NoteThrottlerGuard)
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
