import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmEntity } from './entities/alarm.entity';
import { OrmCreateAlarmRepository } from './repositories/create-alarm.repository';
import { CreateAlarmRepository } from '../../../application/ports/create-alarm.repository';
import { AlarmItemEntity } from './entities/alarm-item.entity';
import { UpsertMaterializedAlarmRepository } from 'src/alarms/application/ports/upsert-materialized-alarm.repository';
import { OrmUpsertMaterializedAlarmRepository } from './repositories/upsert-materialized-alarm.repository';
import { FindAlarmRepository } from '../../../application/ports/find-alarm.repository';
import { OrmFindAlarmRepository } from './repositories/find-alarm.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterializedAlarmView, MaterializedAlarmViewSchema } from './schemas/materialized-alarm-view.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
    MongooseModule.forFeature([
      {
        name: MaterializedAlarmView.name,
        schema: MaterializedAlarmViewSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: CreateAlarmRepository,
      useClass: OrmCreateAlarmRepository,
    },
    {
      provide: FindAlarmRepository,
      useClass: OrmFindAlarmRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: OrmUpsertMaterializedAlarmRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmRepository,
    UpsertMaterializedAlarmRepository
  ],
})
export class OrmAlarmPersistenceModule {}
