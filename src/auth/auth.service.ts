import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredsDto } from './dto/auth-creds.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  signUp(authCredsDto: AuthCredsDto): Promise<void> {
    return this.userRepository.createUser(authCredsDto);
  }
}
