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
import { GroupDTO } from '../../service/dto/group.dto';
import { GroupService } from '../../service/group.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/groups')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('groups')
export class GroupController {
    logger = new Logger('GroupController');

    constructor(private readonly groupService: GroupService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: GroupDTO,
    })
    async getAll(@Req() req: Request): Promise<GroupDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.groupService.findAndCount({
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
        type: GroupDTO,
    })
    async getOne(@Param('id') id: number): Promise<GroupDTO> {
        return await this.groupService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create group' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: GroupDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() groupDTO: GroupDTO): Promise<GroupDTO> {
        const created = await this.groupService.save(groupDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Group', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update group' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: GroupDTO,
    })
    async put(@Req() req: Request, @Body() groupDTO: GroupDTO): Promise<GroupDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Group', groupDTO.id);
        return await this.groupService.update(groupDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update group with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: GroupDTO,
    })
    async putId(@Req() req: Request, @Body() groupDTO: GroupDTO): Promise<GroupDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Group', groupDTO.id);
        return await this.groupService.update(groupDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete group' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Group', id);
        return await this.groupService.deleteById(id);
    }
}
