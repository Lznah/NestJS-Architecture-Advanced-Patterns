import { AutowireEvent } from "src/shared/decorators/autowire-event.decorator";

@AutowireEvent
export class AlarmAcknowledgedEvent {
    constructor(public readonly alarmId: string) {}
}