import { Transform } from 'class-transformer';
import { IsEnum, IsInt, Max, Min } from 'class-validator';

export class Note {
  @IsEnum(['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'], {
    message: 'note must be a real note A-G use caps',
  })
  letter:
    | 'A'
    | 'A#'
    | 'B'
    | 'C'
    | 'C#'
    | 'D'
    | 'D#'
    | 'E'
    | 'F'
    | 'F#'
    | 'G'
    | 'G#';

  @IsInt({ message: 'value must be number' })
  @Min(1, { message: 'value cannot be less than 1' })
  @Max(9, { message: 'value cannot be more than 9' })
  octave: number;
}
