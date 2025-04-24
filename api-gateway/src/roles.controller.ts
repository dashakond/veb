import { Body, Controller, Get, Param, Post, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';


@Controller('roles')
export class RolesController {
  constructor(@Inject('USER_SERVICE') private readonly userService: ClientProxy) {}

  @Post()
  async create(@Body() dto: any) {
    try {
      return await this.userService.send({ cmd: 'create_role' }, dto).toPromise();
    } catch (err) {
      throw new HttpException(err.message || 'Помилка при створенні ролі', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:value')
  async getByValue(@Param('value') value: string) {
    try {
      return await this.userService.send({ cmd: 'get_role_by_value' }, value).toPromise();
    } catch (err) {
      throw new HttpException(err.message || 'Помилка при отриманні ролі', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post('/role')
  async addRole(@Body() dto: any) {
    return this.userService.send({ cmd: 'add-role' }, dto).toPromise();
  }
}
