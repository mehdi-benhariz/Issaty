import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { SubjectDTO } from '../../service/dto/subject.dto';
import { SubjectService } from '../../service/subject.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard,  Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/subjects')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('subjects')
export class SubjectController {
  logger = new Logger('SubjectController');

  constructor(private readonly subjectService: SubjectService) {}


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: SubjectDTO,
  })
  async getAll(@Req() req: Request): Promise<SubjectDTO []>  {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.subjectService.findAndCount({
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
    type: SubjectDTO,
  })
  async getOne(@Param('id') id: number): Promise<SubjectDTO>  {
    return await this.subjectService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create subject' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: SubjectDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() subjectDTO: SubjectDTO): Promise<SubjectDTO>  {
    const created = await this.subjectService.save(subjectDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Subject', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update subject' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: SubjectDTO,
  })
  async put(@Req() req: Request, @Body() subjectDTO: SubjectDTO): Promise<SubjectDTO>  {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Subject', subjectDTO.id);
    return await this.subjectService.update(subjectDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update subject with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: SubjectDTO,
  })
  async putId(@Req() req: Request, @Body() subjectDTO: SubjectDTO): Promise<SubjectDTO>  {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Subject', subjectDTO.id);
    return await this.subjectService.update(subjectDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete subject' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void>  {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Subject', id);
    return await this.subjectService.deleteById(id);
  }
}
