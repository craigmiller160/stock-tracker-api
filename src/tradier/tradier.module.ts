import { Module } from '@nestjs/common';
import { TradierController } from './tradier.controller';

@Module({
  controllers: [TradierController],
})
export class TradierModule {}
