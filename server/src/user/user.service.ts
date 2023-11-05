import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
// import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService, // это не нужно, если вериф после регистр
  ) {} // в переменной userRepository теперь доступны все методы из тайпорм для работы с базой данных
  async create(createUserDto: CreateUserDto) {
    // модель типизации параметров, ке будем принимать в эту фкцию
    // указываем то, что получаем при создании юзера - почта, пароль
    //прописываем в классе CreateUserDto
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existUser) {
      throw new BadRequestException('This email already exists!');
    }

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
    });
    const token = this.jwtService.sign({ email: createUserDto.email }); //Это не нужно, если есть верификация
    return { user, token }; //после нажатия "зарег" можем сразу войти по токену в систему. Это не нужно, если есть верификация
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
