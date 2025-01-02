import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class MaterializedAlarmView {
    @Prop({ unique: true, index: true })
    id: string;

    @Prop()
    name: string;

    @Prop()
    severity: string;

    @Prop()
    triggeredAt: Date;

    @Prop()
    isAckowledged: boolean;

    @Prop(
        raw([
            {
                id: String,
                name: String,
                type: {
                    type: String,
                },
            },
        ]),
    )
    items: Array<{
        id: string;
        name: string;
        type: String;
    }>;
}

export const MaterializedAlarmViewSchema = SchemaFactory.createForClass(
    MaterializedAlarmView,
);