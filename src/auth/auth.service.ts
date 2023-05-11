import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredsDto } from './dto/auth-creds.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredsDto: AuthCredsDto): Promise<void> {
    return this.userRepository.createUser(authCredsDto);
  }

  // signIn(authCredsDto: AuthCredsDto): Promise<string> {
  //   return this.userRepository.signIn(authCredsDto);
  // }

  async signIn(authCredsDto: AuthCredsDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredsDto;

    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(' Please check your creds');
    }
  }
}
