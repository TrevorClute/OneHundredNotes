import { Module } from '@nestjs/common';
import { NoteGateway } from './note.gateway';

@Module({
  providers: [NoteGateway]
})
export class NoteModule {}
