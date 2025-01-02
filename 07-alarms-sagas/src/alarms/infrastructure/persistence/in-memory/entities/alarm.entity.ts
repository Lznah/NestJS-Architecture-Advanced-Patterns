import { AlarmItemEntity } from "../../orm/entities/alarm-item.entity";

export class AlarmEntity {
  id: string;
  name: string;
  severity: string;
  triggeredAt: Date;
  isAckowledged: boolean;
  items: Array<AlarmItemEntity>;
}
