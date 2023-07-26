import { Global, Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';

@Global()
@Module({
  imports: [PlayersModule],
})
export class AppModule {}
