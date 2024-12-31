import { MongooseModule } from "@nestjs/mongoose";
import { MongoEventStore } from "./mongo-event-store";
import { EventStorePublisher } from "./publishers/event-store.publisher";
import { EventSerializer } from "./serializers/event.serializer";
import { EVENT_STORE_CONNECTION } from "../../../core/core.constants";
import { EventSchema } from "./schemas/event.schema";
import { Module } from "@nestjs/common";
import { EventDeserializer } from "./deserializers/event.deserializer";
import { EventsBridge } from "./events-bridge";

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: Event.name, schema: EventSchema }],
            EVENT_STORE_CONNECTION,
        )
    ],
    providers: [
        EventSerializer,
        EventStorePublisher,
        MongoEventStore,
        EventsBridge,
        EventDeserializer
    ]
})
export class SharedInfrastructureModule {}