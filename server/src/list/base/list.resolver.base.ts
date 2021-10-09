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
import { CreateListArgs } from "./CreateListArgs";
import { UpdateListArgs } from "./UpdateListArgs";
import { DeleteListArgs } from "./DeleteListArgs";
import { ListFindManyArgs } from "./ListFindManyArgs";
import { ListFindUniqueArgs } from "./ListFindUniqueArgs";
import { List } from "./List";
import { ItemFindManyArgs } from "../../item/base/ItemFindManyArgs";
import { Item } from "../../item/base/Item";
import { Household } from "../../household/base/Household";
import { User } from "../../user/base/User";
import { ListService } from "../list.service";

@graphql.Resolver(() => List)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class ListResolverBase {
  constructor(
    protected readonly service: ListService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "read",
    possession: "any",
  })
  async _listsMeta(
    @graphql.Args() args: ListFindManyArgs
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

  @graphql.Query(() => [List])
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "read",
    possession: "any",
  })
  async lists(
    @graphql.Args() args: ListFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<List[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "List",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => List, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "read",
    possession: "own",
  })
  async list(
    @graphql.Args() args: ListFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<List | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "List",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => List)
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "create",
    possession: "any",
  })
  async createList(
    @graphql.Args() args: CreateListArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<List> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "List",
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
        `providing the properties: ${properties} on ${"List"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        household: {
          connect: args.data.household,
        },

        owner: {
          connect: args.data.owner,
        },
      },
    });
  }

  @graphql.Mutation(() => List)
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "update",
    possession: "any",
  })
  async updateList(
    @graphql.Args() args: UpdateListArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<List | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "List",
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
        `providing the properties: ${properties} on ${"List"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          household: {
            connect: args.data.household,
          },

          owner: {
            connect: args.data.owner,
          },
        },
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

  @graphql.Mutation(() => List)
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "delete",
    possession: "any",
  })
  async deleteList(@graphql.Args() args: DeleteListArgs): Promise<List | null> {
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

  @graphql.ResolveField(() => [Item])
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "read",
    possession: "any",
  })
  async items(
    @graphql.Parent() parent: List,
    @graphql.Args() args: ItemFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Item[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Item",
    });
    const results = await this.service.findItems(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => Household, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "read",
    possession: "any",
  })
  async household(
    @graphql.Parent() parent: List,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Household | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Household",
    });
    const result = await this.service.getHousehold(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "read",
    possession: "any",
  })
  async owner(
    @graphql.Parent() parent: List,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service.getOwner(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
