import { Injectable } from '@nestjs/common';
import { Player, Prisma } from '@prisma/client';
import { prisma } from '../../../db';

@Injectable()
export class PlayersService {
  async findAll() {
    return await prisma.player.findMany();
  }

  async create(data: Prisma.PlayerCreateInput): Promise<Player> {
    return await prisma.player.create({
      data,
    });
  }
}
