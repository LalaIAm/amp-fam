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
import { ItemService } from "../item.service";
import { ItemCreateInput } from "./ItemCreateInput";
import { ItemWhereInput } from "./ItemWhereInput";
import { ItemWhereUniqueInput } from "./ItemWhereUniqueInput";
import { ItemFindManyArgs } from "./ItemFindManyArgs";
import { ItemUpdateInput } from "./ItemUpdateInput";
import { Item } from "./Item";

export class ItemControllerBase {
  constructor(
    protected readonly service: ItemService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Item",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Item })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: ItemCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Item> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Item",
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
        `providing the properties: ${properties} on ${"Item"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        list: {
          connect: data.list,
        },
      },
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
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Item",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Item] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => ItemFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Item[]> {
    const args = plainToClass(ItemFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Item",
    });
    const results = await this.service.findMany({
      ...args,
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
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Item",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Item })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: ItemWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Item | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Item",
    });
    const result = await this.service.findOne({
      where: params,
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
    resource: "Item",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Item })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: ItemWhereUniqueInput,
    @common.Body()
    data: ItemUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Item | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Item",
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
        `providing the properties: ${properties} on ${"Item"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          list: {
            connect: data.list,
          },
        },
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
    resource: "Item",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Item })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: ItemWhereUniqueInput
  ): Promise<Item | null> {
    try {
      return await this.service.delete({
        where: params,
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
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
