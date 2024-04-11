import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ClassroomDTO } from '../src/service/dto/classroom.dto';
import { ClassroomService } from '../src/service/classroom.service';

describe('Classroom Controller', () => {
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
            .overrideProvider(ClassroomService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all classrooms ', async () => {
        const getEntities: ClassroomDTO[] = (
            await request(app.getHttpServer())
                .get('/api/classrooms')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET classrooms by id', async () => {
        const getEntity: ClassroomDTO = (
            await request(app.getHttpServer())
                .get('/api/classrooms/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create classrooms', async () => {
        const createdEntity: ClassroomDTO = (
            await request(app.getHttpServer())
                .post('/api/classrooms')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update classrooms', async () => {
        const updatedEntity: ClassroomDTO = (
            await request(app.getHttpServer())
                .put('/api/classrooms')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update classrooms from id', async () => {
        const updatedEntity: ClassroomDTO = (
            await request(app.getHttpServer())
                .put('/api/classrooms/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE classrooms', async () => {
        const deletedEntity: ClassroomDTO = (
            await request(app.getHttpServer())
                .delete('/api/classrooms/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
