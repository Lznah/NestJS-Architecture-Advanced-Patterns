import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { EventBus, IEvent, IEventPublisher } from "@nestjs/cqrs";
import { VersionedAggregatedRoot } from "../../../domain/aggregate-root";
import { MongoEventStore } from "../mongo-event-store";
import { EventSerializer } from "../serializers/event.serializer";

@Injectable()
export class EventStorePublisher
    implements OnApplicationBootstrap, IEventPublisher
{
    constructor(
        private readonly eventStore: MongoEventStore,
        private readonly eventBus: EventBus,
        private readonly eventSerializer: EventSerializer,
    ) {}

    onApplicationBootstrap() {
        this.eventBus.publisher = this;
    }

    publish<T extends IEvent = IEvent>(
        event: T,
        dispatcher: VersionedAggregatedRoot,
    ) {
        const serializableEvent = this.eventSerializer.serialize(event, dispatcher);
        return this.eventStore.persist(serializableEvent);
    }

    publishAll<T extends IEvent = IEvent>(
        events: T[], 
        dispatcher: VersionedAggregatedRoot,
    ) {
       const serializableEvents = events
        .map((event) => this.eventSerializer.serialize(event, dispatcher))
        .map((serializableEvent, index) => ({
            ...serializableEvent,
            position: dispatcher.version.value + index + 1,
        }));
        this.eventStore.persist(serializableEvents)
    }
}