import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AlarmRepository } from "../ports/alarm.repository";
import { GetAlarmsQuery } from "./get-alarms.query";
import { Alarm } from "../../domain/alarm";

@QueryHandler(GetAlarmsQuery)
export class GetAlarmQueryHandler
    implements IQueryHandler<GetAlarmsQuery, Alarm[]>
{
  constructor(private readonly alarmRepository: AlarmRepository) {}

  async execute(query: GetAlarmsQuery): Promise<Alarm[]> {
    return this.alarmRepository.findAll();
  }
}