import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ProfileDTO } from '../src/service/dto/profile.dto';
import { ProfileService } from '../src/service/profile.service';

describe('Profile Controller', () => {
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
            .overrideProvider(ProfileService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all profiles ', async () => {
        const getEntities: ProfileDTO[] = (
            await request(app.getHttpServer())
                .get('/api/profiles')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET profiles by id', async () => {
        const getEntity: ProfileDTO = (
            await request(app.getHttpServer())
                .get('/api/profiles/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create profiles', async () => {
        const createdEntity: ProfileDTO = (
            await request(app.getHttpServer())
                .post('/api/profiles')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update profiles', async () => {
        const updatedEntity: ProfileDTO = (
            await request(app.getHttpServer())
                .put('/api/profiles')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update profiles from id', async () => {
        const updatedEntity: ProfileDTO = (
            await request(app.getHttpServer())
                .put('/api/profiles/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE profiles', async () => {
        const deletedEntity: ProfileDTO = (
            await request(app.getHttpServer())
                .delete('/api/profiles/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
