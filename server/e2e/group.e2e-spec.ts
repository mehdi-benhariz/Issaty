import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { GroupDTO } from '../src/service/dto/group.dto';
import { GroupService } from '../src/service/group.service';

describe('Group Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(GroupService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all groups ', async () => {
        const getEntities: GroupDTO[] = (await request(app.getHttpServer()).get('/api/groups').expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET groups by id', async () => {
        const getEntity: GroupDTO = (
            await request(app.getHttpServer())
                .get('/api/groups/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create groups', async () => {
        const createdEntity: GroupDTO = (
            await request(app.getHttpServer()).post('/api/groups').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update groups', async () => {
        const updatedEntity: GroupDTO = (
            await request(app.getHttpServer()).put('/api/groups').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update groups from id', async () => {
        const updatedEntity: GroupDTO = (
            await request(app.getHttpServer())
                .put('/api/groups/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE groups', async () => {
        const deletedEntity: GroupDTO = (
            await request(app.getHttpServer())
                .delete('/api/groups/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
