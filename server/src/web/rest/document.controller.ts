import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { DocumentDTO } from '../../service/dto/document.dto';
import { DocumentService } from '../../service/document.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard,  Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/documents')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('documents')
export class DocumentController {
  logger = new Logger('DocumentController');

  constructor(private readonly documentService: DocumentService) {}


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: DocumentDTO,
  })
  async getAll(@Req() req: Request): Promise<DocumentDTO []>  {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.documentService.findAndCount({
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
    type: DocumentDTO,
  })
  async getOne(@Param('id') id: number): Promise<DocumentDTO>  {
    return await this.documentService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create document' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: DocumentDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() documentDTO: DocumentDTO): Promise<DocumentDTO>  {
    const created = await this.documentService.save(documentDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Document', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update document' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DocumentDTO,
  })
  async put(@Req() req: Request, @Body() documentDTO: DocumentDTO): Promise<DocumentDTO>  {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Document', documentDTO.id);
    return await this.documentService.update(documentDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update document with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DocumentDTO,
  })
  async putId(@Req() req: Request, @Body() documentDTO: DocumentDTO): Promise<DocumentDTO>  {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Document', documentDTO.id);
    return await this.documentService.update(documentDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete document' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void>  {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Document', id);
    return await this.documentService.deleteById(id);
  }
}
