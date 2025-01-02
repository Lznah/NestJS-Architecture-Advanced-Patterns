import { AutowireEvent } from 'src/shared/decorators/autowire-event.decorator';
import { Alarm } from '../alarm';

@AutowireEvent
export class AlarmCreatedEvent {
  constructor(public readonly alarm: Alarm) {}
}
