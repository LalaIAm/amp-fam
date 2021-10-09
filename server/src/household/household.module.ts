import { Module } from "@nestjs/common";
import { HouseholdModuleBase } from "./base/household.module.base";
import { HouseholdService } from "./household.service";
import { HouseholdController } from "./household.controller";
import { HouseholdResolver } from "./household.resolver";

@Module({
  imports: [HouseholdModuleBase],
  controllers: [HouseholdController],
  providers: [HouseholdService, HouseholdResolver],
  exports: [HouseholdService],
})
export class HouseholdModule {}
