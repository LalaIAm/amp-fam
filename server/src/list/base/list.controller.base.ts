import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ListService } from "../list.service";
import { ListCreateInput } from "./ListCreateInput";
import { ListWhereInput } from "./ListWhereInput";
import { ListWhereUniqueInput } from "./ListWhereUniqueInput";
import { ListFindManyArgs } from "./ListFindManyArgs";
import { ListUpdateInput } from "./ListUpdateInput";
import { List } from "./List";
import { ItemWhereInput } from "../../item/base/ItemWhereInput";
import { Item } from "../../item/base/Item";

export class ListControllerBase {
  constructor(
    protected readonly service: ListService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: List })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: ListCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<List> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "List",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"List"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        household: {
          connect: data.household,
        },

        owner: {
          connect: data.owner,
        },
      },
      select: {
        createdAt: true,

        household: {
          select: {
            id: true,
          },
        },

        id: true,

        owner: {
          select: {
            id: true,
          },
        },

        title: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [List] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => ListFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<List[]> {
    const args = plainToClass(ListFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "List",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,

        household: {
          select: {
            id: true,
          },
        },

        id: true,

        owner: {
          select: {
            id: true,
          },
        },

        title: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: List })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: ListWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<List | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "List",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,

        household: {
          select: {
            id: true,
          },
        },

        id: true,

        owner: {
          select: {
            id: true,
          },
        },

        title: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: List })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: ListWhereUniqueInput,
    @common.Body()
    data: ListUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<List | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "List",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"List"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          household: {
            connect: data.household,
          },

          owner: {
            connect: data.owner,
          },
        },
        select: {
          createdAt: true,

          household: {
            select: {
              id: true,
            },
          },

          id: true,

          owner: {
            select: {
              id: true,
            },
          },

          title: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: List })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: ListWhereUniqueInput
  ): Promise<List | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,

          household: {
            select: {
              id: true,
            },
          },

          id: true,

          owner: {
            select: {
              id: true,
            },
          },

          title: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id/items")
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => ItemWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyItems(
    @common.Req() request: Request,
    @common.Param() params: ListWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Item[]> {
    const query: ItemWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Item",
    });
    const results = await this.service.findItems(params.id, {
      where: query,
      select: {
        completed: true,
        createdAt: true,
        details: true,
        dueDate: true,
        id: true,

        list: {
          select: {
            id: true,
          },
        },

        title: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/items")
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "update",
    possession: "any",
  })
  async createItems(
    @common.Param() params: ListWhereUniqueInput,
    @common.Body() body: ListWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      items: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "List",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"List"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/items")
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "update",
    possession: "any",
  })
  async updateItems(
    @common.Param() params: ListWhereUniqueInput,
    @common.Body() body: ListWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      items: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "List",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"List"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/items")
  @nestAccessControl.UseRoles({
    resource: "List",
    action: "update",
    possession: "any",
  })
  async deleteItems(
    @common.Param() params: ListWhereUniqueInput,
    @common.Body() body: ListWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      items: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "List",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"List"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
