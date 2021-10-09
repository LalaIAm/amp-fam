import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { HouseholdResolverBase } from "./base/household.resolver.base";
import { Household } from "./base/Household";
import { HouseholdService } from "./household.service";

@graphql.Resolver(() => Household)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class HouseholdResolver extends HouseholdResolverBase {
  constructor(
    protected readonly service: HouseholdService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
