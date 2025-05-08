import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private usersRepo: UsersRepository) { }
  create(createUserDto: CreateUserDto) {
    return this.usersRepo.create(createUserDto);
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepo.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepo.delete(id);
  }

  updateHashedRefreshToken(userId: number, hashedRefreshToken: string | null) {
    // return this.db.query.users.update({
    //   where: (users) => users.id.equals(userId),
    //   data: {
    //     refreshToken: hashedRefreshToken,
    //   },
    // });
  }

}
