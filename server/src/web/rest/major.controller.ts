import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { MajorDTO } from '../../service/dto/major.dto';
import { MajorService } from '../../service/major.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/majors')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('majors')
export class MajorController {
    logger = new Logger('MajorController');

    constructor(private readonly majorService: MajorService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: MajorDTO,
    })
    async getAll(@Req() req: Request): Promise<MajorDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.majorService.findAndCount({
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
        type: MajorDTO,
    })
    async getOne(@Param('id') id: number): Promise<MajorDTO> {
        return await this.majorService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create major' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: MajorDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() majorDTO: MajorDTO): Promise<MajorDTO> {
        const created = await this.majorService.save(majorDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Major', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update major' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: MajorDTO,
    })
    async put(@Req() req: Request, @Body() majorDTO: MajorDTO): Promise<MajorDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Major', majorDTO.id);
        return await this.majorService.update(majorDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update major with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: MajorDTO,
    })
    async putId(@Req() req: Request, @Body() majorDTO: MajorDTO): Promise<MajorDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Major', majorDTO.id);
        return await this.majorService.update(majorDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete major' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Major', id);
        return await this.majorService.deleteById(id);
    }
}
