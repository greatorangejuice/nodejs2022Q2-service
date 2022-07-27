import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ description: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'Create user',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ description: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Get all users',
    type: User,
    isArray: true,
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'Get user by id',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'User is not found',
  })
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ description: 'Updates a user password by id' })
  @ApiResponse({
    status: 200,
    description: 'Updates a user password by id',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 403,
    description: 'Wrong old password',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete user' })
  @ApiResponse({
    status: 204,
    description: 'Remove user',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.usersService.remove(id);
  }
}
