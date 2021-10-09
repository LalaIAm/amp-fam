import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ItemWhereInput } from "./ItemWhereInput";
import { Type } from "class-transformer";
import { ItemOrderByInput } from "./ItemOrderByInput";

@ArgsType()
class ItemFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ItemWhereInput,
  })
  @Field(() => ItemWhereInput, { nullable: true })
  @Type(() => ItemWhereInput)
  where?: ItemWhereInput;

  @ApiProperty({
    required: false,
    type: ItemOrderByInput,
  })
  @Field(() => ItemOrderByInput, { nullable: true })
  @Type(() => ItemOrderByInput)
  orderBy?: ItemOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { ItemFindManyArgs };
