import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredsDto } from './dto/auth-creds.dto';

@Controller('auth')
export class AuthController {
  constructor(private authServie: AuthService) {}
  @Post('/signup')
  signUp(@Body() authCredsDto: AuthCredsDto): Promise<void> {
    return this.authServie.signUp(authCredsDto);
  }

  @Get('/signin')
  signIn(@Body() authCredsDto: AuthCredsDto): Promise<{ accessToken: string }> {
    return this.authServie.signIn(authCredsDto);
  }
}
