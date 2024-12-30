import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-severity';
import { AlarmEntity } from '../entities/alarm.entity';
import { Alarm } from '../../../../domain/alarm';
import { AlarmItem } from 'src/alarms/domain/alarm-item';
import { AlarmItemEntity } from '../../orm/entities/alarm-item.entity';

export class AlarmMapper {
  static toDomain(alarmEntity: AlarmEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      alarmEntity.severity as 'critical' | 'low' | 'normal' | 'high',
    );
    const alarmModel = new Alarm(alarmEntity.id);
    alarmModel.name = alarmEntity.name;
    alarmModel.severity = alarmSeverity;
    alarmModel.triggeredAt = alarmEntity.triggeredAt;
    alarmModel.isAcknowledged = alarmEntity.isAckowledged;
    alarmModel.items = alarmEntity.items.map(item => new AlarmItem(item.id, item.name, item.type));
    return alarmModel;
  }

  static toPersistence(alarm: Alarm) {
    const alarmEntity = new AlarmEntity();
    alarmEntity.id = alarm.id;
    alarmEntity.name = alarm.name;
    alarmEntity.severity = alarm.severity.value;
    alarmEntity.triggeredAt = alarm.triggeredAt;
    alarmEntity.isAckowledged = alarm.isAcknowledged;
    alarmEntity.items = alarm.items.map(item => {
      const alarmItemEntity = new AlarmItemEntity();
      alarmItemEntity.id = item.id;
      alarmItemEntity.name = item.name;
      alarmItemEntity.type = item.type;
      return alarmItemEntity;
    });
    return alarmEntity;
  }
}
