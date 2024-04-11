import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AdminDTO } from '../../service/dto/admin.dto';
import { AdminService } from '../../service/admin.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard,  Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/admins')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('admins')
export class AdminController {
  logger = new Logger('AdminController');

  constructor(private readonly adminService: AdminService) {}


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AdminDTO,
  })
  async getAll(@Req() req: Request): Promise<AdminDTO []>  {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.adminService.findAndCount({
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
    type: AdminDTO,
  })
  async getOne(@Param('id') id: number): Promise<AdminDTO>  {
    return await this.adminService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create admin' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AdminDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() adminDTO: AdminDTO): Promise<AdminDTO>  {
    const created = await this.adminService.save(adminDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Admin', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update admin' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AdminDTO,
  })
  async put(@Req() req: Request, @Body() adminDTO: AdminDTO): Promise<AdminDTO>  {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Admin', adminDTO.id);
    return await this.adminService.update(adminDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update admin with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AdminDTO,
  })
  async putId(@Req() req: Request, @Body() adminDTO: AdminDTO): Promise<AdminDTO>  {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Admin', adminDTO.id);
    return await this.adminService.update(adminDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete admin' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void>  {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Admin', id);
    return await this.adminService.deleteById(id);
  }
}
