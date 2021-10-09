import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateHouseholdArgs } from "./CreateHouseholdArgs";
import { UpdateHouseholdArgs } from "./UpdateHouseholdArgs";
import { DeleteHouseholdArgs } from "./DeleteHouseholdArgs";
import { HouseholdFindManyArgs } from "./HouseholdFindManyArgs";
import { HouseholdFindUniqueArgs } from "./HouseholdFindUniqueArgs";
import { Household } from "./Household";
import { ListFindManyArgs } from "../../list/base/ListFindManyArgs";
import { List } from "../../list/base/List";
import { UserFindManyArgs } from "../../user/base/UserFindManyArgs";
import { User } from "../../user/base/User";
import { HouseholdService } from "../household.service";

@graphql.Resolver(() => Household)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class HouseholdResolverBase {
  constructor(
    protected readonly service: HouseholdService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Household",
    action: "read",
    possession: "any",
  })
  async _householdsMeta(
    @graphql.Args() args: HouseholdFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Household])
  @nestAccessControl.UseRoles({
    resource: "Household",
    action: "read",
    possession: "any",
  })
  async households(
    @graphql.Args() args: HouseholdFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Household[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Household",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Household, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Household",
    action: "read",
    possession: "own",
  })
  async household(
    @graphql.Args() args: HouseholdFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Household | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Household",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Household)
  @nestAccessControl.UseRoles({
    resource: "Household",
    action: "create",
    possession: "any",
  })
  async createHousehold(
    @graphql.Args() args: CreateHouseholdArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Household> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Household",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Household"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Household)
  @nestAccessControl.UseRoles({
    resource: "Household",
    action: "update",
    possession: "any",
  })
  async updateHousehold(
    @graphql.Args() args: UpdateHouseholdArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Household | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Household",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Household"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Household)
  @nestAccessControl.UseRoles({
    resource: "Household",
    action: "delete",
    possession: "any",
  })
  async deleteHousehold(
    @graphql.Args() args: DeleteHouseholdArgs
  ): Promise<Household | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => [List])
  @nestAccessControl.UseRoles({
    resource: "Household",
    action: "read",
    possession: "any",
  })
  async lists(
    @graphql.Parent() parent: Household,
    @graphql.Args() args: ListFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<List[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "List",
    });
    const results = await this.service.findLists(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [User])
  @nestAccessControl.UseRoles({
    resource: "Household",
    action: "read",
    possession: "any",
  })
  async members(
    @graphql.Parent() parent: Household,
    @graphql.Args() args: UserFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const results = await this.service.findMembers(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
