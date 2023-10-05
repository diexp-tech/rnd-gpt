import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";

import { UserEntity } from "../entities";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const newUserRecord = this.userRepository.create(data);
    const newUser = await this.userRepository.save(newUserRecord);

    return newUser;
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id });
  }

  async findOne(data: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.findOne(data);
  }

  async findOneWithMessages(userId: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ["messages"],
    });
  }
}
