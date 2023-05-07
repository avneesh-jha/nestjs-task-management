import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @MinLength(8)
  @MaxLength(16)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak!',
  })
  password: string;
}
