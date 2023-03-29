import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
  user_id: string;
}
