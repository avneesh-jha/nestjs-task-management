import { EntityRepository, Repository } from 'typeorm';
import { AuthCredsDto } from './dto/auth-creds.dto';
import { User } from './user.entitiy';
import * as bcrypt from 'bcrypt';

import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredsDto: AuthCredsDto): Promise<void> {
    const { username, password } = authCredsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (e) {
      if (e.code == 23505) {
        throw new ConflictException('User name is duplicate');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // async signIn(authCredsDto: AuthCredsDto): Promise<string> {
  //   const { username, password } = authCredsDto;

  //   const user = await this.findOne({ username });

  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     const payload: JwtPayload = { username };
  //     const accessToken: string = await this.jwtService.sign(payload);
  //     return 'success';
  //   } else {
  //     throw new UnauthorizedException(' Please check your creds');
  //   }
}
