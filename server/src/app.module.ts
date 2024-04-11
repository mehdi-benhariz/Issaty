import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { ormConfig } from './orm.config';
import { ProfileModule } from './module/profile.module';
import { TeacherModule } from './module/teacher.module';
import { DepartmentModule } from './module/department.module';
import { SubjectModule } from './module/subject.module';
import { GroupModule } from './module/group.module';
import { StudentModule } from './module/student.module';
import { AdminModule } from './module/admin.module';
import { DemandModule } from './module/demand.module';
import { DocumentModule } from './module/document.module';
import { MajorModule } from './module/major.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
    imports: [
        TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
        AuthModule,
        ProfileModule,
        TeacherModule,
        DepartmentModule,
        SubjectModule,
        GroupModule,
        StudentModule,
        AdminModule,
        DemandModule,
        DocumentModule,
        MajorModule,
        // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
    ],
    controllers: [
        // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
    ],
    providers: [
        // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
    ],
})
export class AppModule {}
