import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { HouseholdWhereUniqueInput } from "../../household/base/HouseholdWhereUniqueInput";
import { ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
@InputType()
class ListCreateInput {
  @ApiProperty({
    required: true,
    type: () => HouseholdWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => HouseholdWhereUniqueInput)
  @Field(() => HouseholdWhereUniqueInput)
  household!: HouseholdWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @Field(() => UserWhereUniqueInput)
  owner!: UserWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  title!: string;
}
export { ListCreateInput };
