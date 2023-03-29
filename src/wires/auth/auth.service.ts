import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    const { password } = createAuthDto;
    const plainToHash = await hash(password, 10);
    createAuthDto = { ...createAuthDto, password: plainToHash };
    const createUser = await this.userRepo.save(createAuthDto);
    return createUser;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;
    const findUser = await this.userRepo.findOne({ username });
    if (!findUser) {
      throw new HttpException('Not found', 404);
    }
    const checkPass = await compare(password, findUser.password);

    if (!checkPass) {
      throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);
    }
    const payload = { id: findUser.id, username: findUser.username };
    const token = await this.jwtService.sign(payload);
    const data = {
      user: findUser,
      token,
    };
    return data;
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async remove(id: string) {
    await this.userRepo.delete(id);
    return true;
  }
}
