import { Module } from '@nestjs/common';
import { NoteGateway } from './note.gateway';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  providers: [NoteGateway],
})
export class NoteModule {}
