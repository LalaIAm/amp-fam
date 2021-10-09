import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsDate,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ListWhereUniqueInput } from "../../list/base/ListWhereUniqueInput";
@InputType()
class ItemCreateInput {
  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  completed?: boolean | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  details?: string | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  dueDate?: Date | null;

  @ApiProperty({
    required: true,
    type: () => ListWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ListWhereUniqueInput)
  @Field(() => ListWhereUniqueInput)
  list!: ListWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  title!: string;
}
export { ItemCreateInput };
