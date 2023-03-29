import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from 'src/decorators/getUser.decorator';
@ApiTags('messages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('wires/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@GetUser() user: any, @Body() createMessageDto: CreateMessageDto) {
    console.log('user', user);
    return this.messagesService.create(createMessageDto, user);
  }

  @Get()
  findAll(@GetUser() user: any) {
    console.log('user', user.userId);
    return this.messagesService.findAll();
  }

  @Get('me')
  findOne(@GetUser() user: any) {
    return this.messagesService.findOne(user);
  }

  @Get('me/:id')
  async getMessage(@Param('id') id: string) {
    return await this.messagesService.findMessage(id);
  }
}
