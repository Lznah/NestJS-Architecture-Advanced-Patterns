import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AlarmAcknowledgedEvent } from "../../domain/events/alarm-acknowledged.event";
import { SerializableEventPayload } from "../../../shared/domain/interfaces/serializable-event"; // Adjust the import path as necessary
import { UpsertMaterializedAlarmRepository } from "../ports/upsert-materialized-alarm.repository";
import { Logger } from "@nestjs/common";

@EventsHandler(AlarmAcknowledgedEvent)
export class AlarmAcknowledgedEventHandler
    implements IEventHandler<SerializableEventPayload<AlarmAcknowledgedEvent>>
{
    private readonly logger = new Logger(AlarmAcknowledgedEventHandler.name);

    constructor(
        private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
    ) {}

    async handle(event: SerializableEventPayload<AlarmAcknowledgedEvent>) {
        this.logger.log(`Alarm acknowledged event: ${JSON.stringify(event)}`)

        await this.upsertMaterializedAlarmRepository.upsert({
            id: event.alarmId,
            isAcknowledged: true,
        });
    }
}