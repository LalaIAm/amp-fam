import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { HouseholdServiceBase } from "./base/household.service.base";

@Injectable()
export class HouseholdService extends HouseholdServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
