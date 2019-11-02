import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) 
        private userRepository: Repository<UserEntity>,
    ){}

    async showAll(){
        const users = await this.userRepository.find();
        return users.map(user => user.toResponseObject());
    }

    async login(data: UserDTO){
        const {username, password} = data;
        const user = await this.userRepository.find({where: {username}});
        if (!user || (await user.comparePassword(password))){
            throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
        }
    }

    register(data: UserDTO){

    }
}
