export class CreateAlarmCommand {
  constructor(
    public readonly name: string,
    public readonly severity: string,
    public readonly triggeredAt: Date,
    public readonly items: Array<{
      id: string;
      name: string;
      type: string 
    }>,
  ) {}
}
