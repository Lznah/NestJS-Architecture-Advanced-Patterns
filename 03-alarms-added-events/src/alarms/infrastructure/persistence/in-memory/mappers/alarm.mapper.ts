import { AlarmSeverity } from "src/alarms/domain/value-objects/alarm-severity";
import { AlarmEntity } from "../entities/alarm.entity";
import { Alarm } from "../../../../domain/alarm";

export class AlarmMapper {
    static toDomain(alarmEntity: AlarmEntity): Alarm {
        const alarmSeverity = new AlarmSeverity(
            alarmEntity.severity as 'critical' | 'low' | 'normal' | 'high'
        );
        const alarmModel = new Alarm(
            alarmEntity.id,
            alarmEntity.name,
            alarmSeverity
        )
        return alarmModel;
    }

    static toPersistence(alarm: Alarm) {
        const alarmEntity = new AlarmEntity();
        alarmEntity.id = alarm.id;
        alarmEntity.name = alarm.name;
        alarmEntity.severity = alarm.severity.value;
        return alarmEntity;
    }
}