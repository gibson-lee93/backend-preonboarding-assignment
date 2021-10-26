import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async signUp(userCredentialsDto: UserCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(userCredentialsDto);
  }
}
