import { Module } from "@nestjs/common";
import { ListModuleBase } from "./base/list.module.base";
import { ListService } from "./list.service";
import { ListController } from "./list.controller";
import { ListResolver } from "./list.resolver";

@Module({
  imports: [ListModuleBase],
  controllers: [ListController],
  providers: [ListService, ListResolver],
  exports: [ListService],
})
export class ListModule {}
