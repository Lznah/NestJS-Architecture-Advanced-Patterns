import { EventClsRegistry } from "../infrastructure/event-store/event-cls.registry";

export const AutowireEvent: ClassDecorator = (target: any) => {
    EventClsRegistry.add(target);
};