import { 
    Injectable,
    OnApplicationBootstrap,
    OnApplicationShutdown
} from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { ChangeStream, ChangeStreamInsertDocument } from "mongodb";
import { Model } from "mongoose";
import { EventDocument, Event } from "./schemas/event.schema";
import { EVENT_STORE_CONNECTION } from "src/core/core.constants";
import { EventDeserializer } from "./deserializers/event.deserializer";

@Injectable()
export class EventsBridge
    implements OnApplicationBootstrap, OnApplicationShutdown
{
    private changeStream: ChangeStream;

    constructor(
        @InjectModel(Event.name, EVENT_STORE_CONNECTION)
        private readonly eventStore: Model<Event>,
        private readonly eventBus: EventBus,
        private readonly eventDeserializer: EventDeserializer,
    ){}

    onApplicationBootstrap() {
        // you might get a Type Error here - look here to fix the issue https://github.com/Automattic/mongoose/issues/14731
        this.changeStream = this.eventStore
            .watch()
            .on('change', (change: ChangeStreamInsertDocument<EventDocument>) => {
                if(change.operationType === 'insert') {
                    this.handleEventStoreChange(change);
                }
            });
    }

    onApplicationShutdown() {
        this.changeStream.close();
    }
    
    handleEventStoreChange(change: ChangeStreamInsertDocument<EventDocument>) {
        const insertedEvent = change.fullDocument;

        const eventInstance = this.eventDeserializer.deserialize(insertedEvent);
        this.eventBus.subject$.next(eventInstance.data);
    }
}