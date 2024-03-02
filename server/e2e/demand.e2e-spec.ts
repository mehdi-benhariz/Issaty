import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { DemandDTO } from '../src/service/dto/demand.dto';
import { DemandService } from '../src/service/demand.service';

describe('Demand Controller', () => {
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
            .overrideProvider(DemandService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all demands ', async () => {
        const getEntities: DemandDTO[] = (await request(app.getHttpServer()).get('/api/demands').expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET demands by id', async () => {
        const getEntity: DemandDTO = (
            await request(app.getHttpServer())
                .get('/api/demands/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create demands', async () => {
        const createdEntity: DemandDTO = (
            await request(app.getHttpServer()).post('/api/demands').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update demands', async () => {
        const updatedEntity: DemandDTO = (
            await request(app.getHttpServer()).put('/api/demands').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update demands from id', async () => {
        const updatedEntity: DemandDTO = (
            await request(app.getHttpServer())
                .put('/api/demands/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE demands', async () => {
        const deletedEntity: DemandDTO = (
            await request(app.getHttpServer())
                .delete('/api/demands/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
