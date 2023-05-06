import { EntityRepository, Repository } from 'typeorm';
import { AuthCredsDto } from './dto/auth-creds.dto';
import { User } from './user.entitiy';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredsDto: AuthCredsDto): Promise<void> {
    const { username, password } = authCredsDto;
    const user = this.create({ username, password });
    await this.save(user);
  }
}
