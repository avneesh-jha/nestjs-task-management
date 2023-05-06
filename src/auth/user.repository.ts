import { EntityRepository, Not, Repository } from 'typeorm';
import { AuthCredsDto } from './dto/auth-creds.dto';
import { User } from './user.entitiy';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredsDto: AuthCredsDto): Promise<void> {
    const { username, password } = authCredsDto;
    const user = this.create({ username, password });
    try {
      await this.save(user);
    } catch (e) {
      console.log(e.code);
      if (e.code == 23505) {
        throw new ConflictException('User name is duplicate');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
