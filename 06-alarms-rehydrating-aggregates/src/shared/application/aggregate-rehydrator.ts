import { Injectable, Type } from "@nestjs/common";
import { EventStore } from "./ports/event-store";
import { EventPublisher } from "@nestjs/cqrs";
import { VersionedAggregatedRoot } from "../domain/aggregate-root";

@Injectable()
export class AggregateRehydrator {
    constructor(
        private readonly eventStore: EventStore,
        private readonly eventPublisher: EventPublisher
    ) {}

    async rehydrate<T extends VersionedAggregatedRoot>(
        aggregateId: string,
        AggregateCls: Type<T>,
    ): Promise<T> {
        const events = await this.eventStore.getEventsByStreamId(aggregateId);

        const AggregateClsWithDispatcher =
            this.eventPublisher.mergeClassContext(AggregateCls);
        const aggregate = new AggregateClsWithDispatcher(aggregateId);

        aggregate.loadFromHistory(events);
        return aggregate;
    }
}