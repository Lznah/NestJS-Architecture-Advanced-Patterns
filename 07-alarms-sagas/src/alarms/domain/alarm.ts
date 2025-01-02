import { SerializableEventPayload } from 'src/shared/domain/interfaces/serializable-event';
import { VersionedAggregatedRoot } from '../../shared/domain/aggregate-root';
import { AlarmItem } from './alarm-item';
import { AlarmAcknowledgedEvent } from './events/alarm-acknowledged.event';
import { AlarmCreatedEvent } from './events/alarm-created.event';
import { AlarmSeverity } from './value-objects/alarm-severity';

export class Alarm extends VersionedAggregatedRoot {
  public name: string;
  public severity: AlarmSeverity;
  public triggeredAt: Date;
  public isAcknowledged = false;
  public items = new Array<AlarmItem>();
  
  constructor( public id: string) {
    super();
  }

  acknowledge() {
    this.apply(new AlarmAcknowledgedEvent(this.id));
  }

  addAlarmItem(item: AlarmItem) {
    this.items.push(item);
  }

  [`on${AlarmCreatedEvent.name}`](
    event: SerializableEventPayload<AlarmCreatedEvent>
  ) {
    this.name = event.alarm.name;
    this.severity = new AlarmSeverity(event.alarm.severity);
    this.triggeredAt = new Date(event.alarm.triggeredAt);
    this.isAcknowledged = event.alarm.isAcknowledged;
    this.items = event.alarm.items.map(
      item => new AlarmItem(item.id, item.name, item.type)
    )
  }

  [`on${AlarmAcknowledgedEvent.name}`](
    event: SerializableEventPayload<AlarmAcknowledgedEvent>
  ) {
    if(this.isAcknowledged) {
      throw new Error('Alarm had already been acknowledged')
    }
    this.isAcknowledged = true;
  }
}
