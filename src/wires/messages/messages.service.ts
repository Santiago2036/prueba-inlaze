import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    private jwtService: JwtService,
  ) {}
  async create(createMessageDto: CreateMessageDto, user: any) {
    createMessageDto.user_id = user.userId;
    return await this.messageRepo.save(createMessageDto);
  }

  async findAll() {
    return await this.messageRepo.find();
  }

  async findOne(user: any) {
    return await this.messageRepo.find();
  }

  async findMessage(id: string) {
    return await this.messageRepo.findOne(id);
  }

  async remove(id: any) {
    await this.messageRepo.remove(id);
    return { delete: true, status: 'OK' };
  }
}
