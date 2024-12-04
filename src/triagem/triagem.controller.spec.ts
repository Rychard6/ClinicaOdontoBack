import { Test, TestingModule } from '@nestjs/testing';
import { TriagemController } from './triagem.controller';

describe('TriagemController', () => {
  let controller: TriagemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TriagemController],
    }).compile();

    controller = module.get<TriagemController>(TriagemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
