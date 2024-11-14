import { Module } from '@nestjs/common';
import { NoteGateway } from './note.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [ThrottlerModule.forRoot([{ limit: 100, ttl: 1 }])],
  providers: [NoteGateway],
})
export class NoteModule {}
