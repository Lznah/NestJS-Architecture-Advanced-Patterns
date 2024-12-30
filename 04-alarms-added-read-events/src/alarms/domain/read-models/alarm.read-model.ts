export class AlarmReadModel {
    public id: string;
    public name: string;
    public severity: string;
    public triggeredAt: Date;
    public items: Array<{
      id: string;
      name: string;
      type: string;
    }>;
}