import { PrismaService } from "nestjs-prisma";
import { Prisma, Item, List } from "@prisma/client";

export class ItemServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ItemFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ItemFindManyArgs>
  ): Promise<number> {
    return this.prisma.item.count(args);
  }

  async findMany<T extends Prisma.ItemFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ItemFindManyArgs>
  ): Promise<Item[]> {
    return this.prisma.item.findMany(args);
  }
  async findOne<T extends Prisma.ItemFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ItemFindUniqueArgs>
  ): Promise<Item | null> {
    return this.prisma.item.findUnique(args);
  }
  async create<T extends Prisma.ItemCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ItemCreateArgs>
  ): Promise<Item> {
    return this.prisma.item.create<T>(args);
  }
  async update<T extends Prisma.ItemUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ItemUpdateArgs>
  ): Promise<Item> {
    return this.prisma.item.update<T>(args);
  }
  async delete<T extends Prisma.ItemDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ItemDeleteArgs>
  ): Promise<Item> {
    return this.prisma.item.delete(args);
  }

  async getList(parentId: string): Promise<List | null> {
    return this.prisma.item
      .findUnique({
        where: { id: parentId },
      })
      .list();
  }
}
