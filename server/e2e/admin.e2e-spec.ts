import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { AdminDTO } from '../src/service/dto/admin.dto';
import { AdminService } from '../src/service/admin.service';

describe('Admin Controller', () => {
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
            .overrideProvider(AdminService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all admins ', async () => {
        const getEntities: AdminDTO[] = (await request(app.getHttpServer()).get('/api/admins').expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET admins by id', async () => {
        const getEntity: AdminDTO = (
            await request(app.getHttpServer())
                .get('/api/admins/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create admins', async () => {
        const createdEntity: AdminDTO = (
            await request(app.getHttpServer()).post('/api/admins').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update admins', async () => {
        const updatedEntity: AdminDTO = (
            await request(app.getHttpServer()).put('/api/admins').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update admins from id', async () => {
        const updatedEntity: AdminDTO = (
            await request(app.getHttpServer())
                .put('/api/admins/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE admins', async () => {
        const deletedEntity: AdminDTO = (
            await request(app.getHttpServer())
                .delete('/api/admins/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
