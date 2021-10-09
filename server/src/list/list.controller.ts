import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ListService } from "./list.service";
import { ListControllerBase } from "./base/list.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("lists")
@common.Controller("lists")
export class ListController extends ListControllerBase {
  constructor(
    protected readonly service: ListService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
