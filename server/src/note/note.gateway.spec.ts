import { Test, TestingModule } from '@nestjs/testing';
import { NoteGateway } from './note.gateway';

describe('NoteGateway', () => {
  let gateway: NoteGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteGateway],
    }).compile();

    gateway = module.get<NoteGateway>(NoteGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
