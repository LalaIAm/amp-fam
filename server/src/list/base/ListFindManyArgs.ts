import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ListWhereInput } from "./ListWhereInput";
import { Type } from "class-transformer";
import { ListOrderByInput } from "./ListOrderByInput";

@ArgsType()
class ListFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ListWhereInput,
  })
  @Field(() => ListWhereInput, { nullable: true })
  @Type(() => ListWhereInput)
  where?: ListWhereInput;

  @ApiProperty({
    required: false,
    type: ListOrderByInput,
  })
  @Field(() => ListOrderByInput, { nullable: true })
  @Type(() => ListOrderByInput)
  orderBy?: ListOrderByInput;

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

export { ListFindManyArgs };
