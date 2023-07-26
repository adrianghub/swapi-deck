import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async findAll() {
    return this.playersService.findAll();
  }

  @Post('/')
  async create(@Body() params: { name: string; score: number }) {
    await this.playersService.create({
      name: params.name,
      score: params.score,
    });

    return null;
  }
}
