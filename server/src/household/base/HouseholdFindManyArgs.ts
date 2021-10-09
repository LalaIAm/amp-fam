import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { HouseholdWhereInput } from "./HouseholdWhereInput";
import { Type } from "class-transformer";
import { HouseholdOrderByInput } from "./HouseholdOrderByInput";

@ArgsType()
class HouseholdFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => HouseholdWhereInput,
  })
  @Field(() => HouseholdWhereInput, { nullable: true })
  @Type(() => HouseholdWhereInput)
  where?: HouseholdWhereInput;

  @ApiProperty({
    required: false,
    type: HouseholdOrderByInput,
  })
  @Field(() => HouseholdOrderByInput, { nullable: true })
  @Type(() => HouseholdOrderByInput)
  orderBy?: HouseholdOrderByInput;

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

export { HouseholdFindManyArgs };
