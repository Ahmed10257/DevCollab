import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from 'src/repositories/user.repository';
import { Logger } from 'nestjs-pino';
import { Role } from 'src/auth/enums/role.enum';
import { AdUserRecord } from 'src/auth/types/ad-user';

@Injectable()
export class UserService {
  constructor(private usersRepo: UsersRepository, private readonly logger: Logger) { }

  create(createUserDto: CreateUserDto) {
    this.logger.log({ msg: 'Creating user: ', createUserDto }, 'UserService');
    return this.usersRepo.create({ ...createUserDto, role: Role.USER });
  }

  findAll() {
    return this.usersRepo.findAll();
  }

  findOne(id: number) {
    return this.usersRepo.findById(id);
  }

  findUserByEmail(email: string) {
    return this.usersRepo.findByEmail(email);
  }

  findByUsername(username: string) {
    return this.usersRepo.findByUsername(username);
  }

  async upsertFromAd(adUser: AdUserRecord, role: Role) {
    const username = adUser.sAMAccountName;
    const email = adUser.mail ?? `${username}@local.devcollab`;
    const name = adUser.displayName ?? username;

    const existing = await this.usersRepo.findByUsername(username);

    if (!existing) {
      const [created] = await this.usersRepo.createFromAd({
        username,
        name,
        email,
        role,
      });
      return created;
    }

    const [updated] = await this.usersRepo.update(existing.id, {
      name,
      email,
      role,
    });

    return updated ?? existing;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.logger.log({ msg: 'Updating user: ', updateUserDto }, 'UserService');
    return this.usersRepo.update(id, updateUserDto);
  }

  remove(id: number) {
    this.logger.log({ msg: 'Deleting user with id: ', id }, 'UserService');
    return this.usersRepo.delete(id);
  }

  updateHashedRefreshToken(userId: number, hashedRefreshToken: string | null) {
    return this.usersRepo.updateRefreshToken(userId, hashedRefreshToken);
  }
}
