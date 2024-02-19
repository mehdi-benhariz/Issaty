import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ClassroomDTO } from '../../service/dto/classroom.dto';
import { ClassroomService } from '../../service/classroom.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard,  Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/classrooms')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('classrooms')
export class ClassroomController {
  logger = new Logger('ClassroomController');

  constructor(private readonly classroomService: ClassroomService) {}


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ClassroomDTO,
  })
  async getAll(@Req() req: Request): Promise<ClassroomDTO []>  {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.classroomService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ClassroomDTO,
  })
  async getOne(@Param('id') id: number): Promise<ClassroomDTO>  {
    return await this.classroomService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create classroom' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ClassroomDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() classroomDTO: ClassroomDTO): Promise<ClassroomDTO>  {
    const created = await this.classroomService.save(classroomDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Classroom', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update classroom' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ClassroomDTO,
  })
  async put(@Req() req: Request, @Body() classroomDTO: ClassroomDTO): Promise<ClassroomDTO>  {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Classroom', classroomDTO.id);
    return await this.classroomService.update(classroomDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update classroom with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ClassroomDTO,
  })
  async putId(@Req() req: Request, @Body() classroomDTO: ClassroomDTO): Promise<ClassroomDTO>  {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Classroom', classroomDTO.id);
    return await this.classroomService.update(classroomDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete classroom' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void>  {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Classroom', id);
    return await this.classroomService.deleteById(id);
  }
}
