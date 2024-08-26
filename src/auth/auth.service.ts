// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { firstName, lastName, gender, email, password } = registerDto;

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    const user = this.userRepository.create({
      firstName,
      lastName,
      gender,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    return {
      message: 'User registered successfully',
      data: {
        firstName,
        lastName,
        gender,
        email,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
      data: user,
    };
  }
}
