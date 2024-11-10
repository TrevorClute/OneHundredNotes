import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Note } from './Note.dto';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class NoteValidationPipe implements PipeTransform<Note, Note> {
  transform(value: Note, metadata: ArgumentMetadata) {
    const set: Set<string> = new Set([
      'A',
      'A#',
      'B',
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
    ]);

    try {
      if (!set.has(value.letter)) {
        throw new BadRequestException();
      }
      if (!(value.octave > 0 && value.octave < 10)) {
        throw new BadRequestException();
      }
    } catch (e) {}
    return value;
  }
}
