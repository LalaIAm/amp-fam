import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, ValidateNested, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { Household } from "../../household/base/Household";
import { Item } from "../../item/base/Item";
import { User } from "../../user/base/User";
@ObjectType()
class List {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: () => Household,
  })
  @ValidateNested()
  @Type(() => Household)
  household?: Household;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: () => [Item],
  })
  @ValidateNested()
  @Type(() => Item)
  @IsOptional()
  items?: Array<Item>;

  @ApiProperty({
    required: true,
    type: () => User,
  })
  @ValidateNested()
  @Type(() => User)
  owner?: User;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  title!: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { List };
