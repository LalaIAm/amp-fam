import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { HouseholdService } from "./household.service";
import { HouseholdControllerBase } from "./base/household.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("households")
@common.Controller("households")
export class HouseholdController extends HouseholdControllerBase {
  constructor(
    protected readonly service: HouseholdService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
