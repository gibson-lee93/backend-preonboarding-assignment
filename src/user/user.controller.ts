import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signUp(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<{ message: string }> {
    return this.userService.signUp(userCredentialsDto);
  }

  @Post('/signin')
  @HttpCode(200)
  signIn(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<{ message: string; accessToken: string }> {
    return this.userService.signIn(userCredentialsDto);
  }
}
