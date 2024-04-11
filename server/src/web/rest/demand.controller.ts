import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { DemandDTO } from '../../service/dto/demand.dto';
import { DemandService } from '../../service/demand.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard,  Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/demands')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('demands')
export class DemandController {
  logger = new Logger('DemandController');

  constructor(private readonly demandService: DemandService) {}


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: DemandDTO,
  })
  async getAll(@Req() req: Request): Promise<DemandDTO []>  {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.demandService.findAndCount({
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
    type: DemandDTO,
  })
  async getOne(@Param('id') id: number): Promise<DemandDTO>  {
    return await this.demandService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create demand' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: DemandDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() demandDTO: DemandDTO): Promise<DemandDTO>  {
    const created = await this.demandService.save(demandDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Demand', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update demand' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DemandDTO,
  })
  async put(@Req() req: Request, @Body() demandDTO: DemandDTO): Promise<DemandDTO>  {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Demand', demandDTO.id);
    return await this.demandService.update(demandDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update demand with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DemandDTO,
  })
  async putId(@Req() req: Request, @Body() demandDTO: DemandDTO): Promise<DemandDTO>  {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Demand', demandDTO.id);
    return await this.demandService.update(demandDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete demand' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void>  {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Demand', id);
    return await this.demandService.deleteById(id);
  }
}
