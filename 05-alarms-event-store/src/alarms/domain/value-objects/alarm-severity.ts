export class AlarmSeverity {
  constructor(readonly value: 'critical' | 'high' | 'normal' | 'low') {}

  equals(severity: AlarmSeverity): boolean {
    return this.value === severity.value;
  }
}
