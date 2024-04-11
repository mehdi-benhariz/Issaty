import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from '../service/dto/user-login.dto';
import { Payload } from '../security/payload.interface';
import * as bcrypt from 'bcrypt';
import { AuthorityRepository } from '../repository/authority.repository';
import { UserService } from '../service/user.service';
import { UserDTO } from './dto/user.dto';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class AuthService {
    logger = new Logger('AuthService');
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(AuthorityRepository) private authorityRepository: AuthorityRepository,
        private userService: UserService,
    ) {}

    async login(userLogin: UserLoginDTO): Promise<any> {
        const loginUserName = userLogin.username;
        const loginPassword = userLogin.password;

        const userFind = await this.userService.findByFields({ where: { login: loginUserName } });
<<<<<<< HEAD
        if (!userFind) {
            throw new HttpException('Invalid login name!', HttpStatus.BAD_REQUEST);
        }

        const validPassword = await bcrypt.compare(loginPassword, userFind.password);
        if (!validPassword) {
            throw new HttpException('Invalid  password!', HttpStatus.BAD_REQUEST);
        }

        if (!userFind.activated) {
=======
        const validPassword = !!userFind && (await bcrypt.compare(loginPassword, userFind.password));
        if (!userFind || !validPassword) {
            throw new HttpException('Invalid login name or password!', HttpStatus.BAD_REQUEST);
        }

        if (userFind && !userFind.activated) {
>>>>>>> b85e89a3fd4fbb87748d01b798aeab494ad73d9a
            throw new HttpException('Your account is not been activated!', HttpStatus.BAD_REQUEST);
        }

        const user = await this.findUserWithAuthById(userFind.id);

        const payload: Payload = { id: user.id, username: user.login, authorities: user.authorities };

        /* eslint-disable */
<<<<<<< HEAD
        return {
            id_token: this.jwtService.sign(payload),
        };
    }

    /* eslint-enable */
=======
    return {
      id_token: this.jwtService.sign(payload),
    };
  }

  /* eslint-enable */
>>>>>>> b85e89a3fd4fbb87748d01b798aeab494ad73d9a
    async validateUser(payload: Payload): Promise<UserDTO | undefined> {
        return await this.findUserWithAuthById(payload.id);
    }

    async findUserWithAuthById(userId: number): Promise<UserDTO | undefined> {
        const userDTO: UserDTO = await this.userService.findByFields({ where: { id: userId } });
        return userDTO;
    }

    async getAccount(userId: number): Promise<UserDTO | undefined> {
        const userDTO: UserDTO = await this.findUserWithAuthById(userId);
        if (!userDTO) {
            return;
        }
        return userDTO;
    }

    async changePassword(userLogin: string, currentClearTextPassword: string, newPassword: string): Promise<void> {
        const userFind: UserDTO = await this.userService.findByFields({ where: { login: userLogin } });
        if (!userFind) {
            throw new HttpException('Invalid login name!', HttpStatus.BAD_REQUEST);
        }

        if (!(await bcrypt.compare(currentClearTextPassword, userFind.password))) {
            throw new HttpException('Invalid password!', HttpStatus.BAD_REQUEST);
        }
        userFind.password = newPassword;
        await this.userService.save(userFind, userLogin, true);
        return;
    }

    async registerNewUser(newUser: UserDTO): Promise<UserDTO> {
        let userFind: UserDTO = await this.userService.findByFields({ where: { login: newUser.login } });
        if (userFind) {
            throw new HttpException('Login name already used!', HttpStatus.BAD_REQUEST);
        }
<<<<<<< HEAD

=======
>>>>>>> b85e89a3fd4fbb87748d01b798aeab494ad73d9a
        userFind = await this.userService.findByFields({ where: { email: newUser.email } });
        if (userFind) {
            throw new HttpException('Email is already in use!', HttpStatus.BAD_REQUEST);
        }
<<<<<<< HEAD

=======
>>>>>>> b85e89a3fd4fbb87748d01b798aeab494ad73d9a
        newUser.authorities = ['ROLE_USER'];
        const user: UserDTO = await this.userService.save(newUser, newUser.login, true);
        return user;
    }

<<<<<<< HEAD
    async updateUserSettings(userLogin: string, newUserInfo: UserDTO): Promise<void> {
=======
    async updateUserSettings(userLogin: string, newUserInfo: UserDTO): Promise<UserDTO> {
>>>>>>> b85e89a3fd4fbb87748d01b798aeab494ad73d9a
        const userFind: UserDTO = await this.userService.findByFields({ where: { login: userLogin } });
        if (!userFind) {
            throw new HttpException('Invalid login name!', HttpStatus.BAD_REQUEST);
        }
<<<<<<< HEAD

=======
>>>>>>> b85e89a3fd4fbb87748d01b798aeab494ad73d9a
        const userFindEmail: UserDTO = await this.userService.findByFields({ where: { email: newUserInfo.email } });
        if (userFindEmail && newUserInfo.email !== userFind.email) {
            throw new HttpException('Email is already in use!', HttpStatus.BAD_REQUEST);
        }

        userFind.firstName = newUserInfo.firstName;
        userFind.lastName = newUserInfo.lastName;
        userFind.email = newUserInfo.email;
        userFind.langKey = newUserInfo.langKey;
        await this.userService.save(userFind, userLogin);
<<<<<<< HEAD
=======
        return;
>>>>>>> b85e89a3fd4fbb87748d01b798aeab494ad73d9a
    }

    async getAllUsers(options: FindManyOptions<UserDTO>): Promise<[UserDTO[], number]> {
        return await this.userService.findAndCount(options);
    }
}
