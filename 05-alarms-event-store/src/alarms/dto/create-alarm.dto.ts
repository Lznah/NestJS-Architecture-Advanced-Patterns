export class CreateAlarmDto {
  name: string;
  severity: string;
  triggeredAt: Date;
  items: Array<{
    id: string;
    name: string;
    type: string;
  }>;
}
