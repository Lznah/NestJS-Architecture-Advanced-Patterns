export type SerializableEventPayload<T> = T extends object
    ? {
        [K in keyof T]: T[K] extends { toJSON(): infer U }
        ? U
        : SerializableEventPayload<T[K]>;
    }
    : T;

export interface SerializableEvent<T = any> {
    streamId: string;
    type: string;
    position: number;
    data: SerializableEventPayload<T>;
}