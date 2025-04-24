import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dro';

import { MessagePattern, Payload } from '@nestjs/microservices';
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService){
    }
    @MessagePattern({ cmd: 'create_role' })
    async createRole(@Payload() dto: CreateRoleDto) {
      return this.roleService.createRole(dto);
    }
  
    @MessagePattern({ cmd: 'get_role_by_value' })
    async getRoleByValue(@Payload() value: string) {
      return this.roleService.getRoleByValue(value);
    }
}
