import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class AirplanesDto {
  @ApiProperty({
    description: 'Airplane ID',
    example: '63bb03d8f4e93c549fac0272',
  })
  id: string;
  
  @ApiProperty({
    description: 'Airplane name',
    example: 'Boeing 737-800',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Number of seats',
    example: '168',
  })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  numberOfSeats: number;
}

export class AirplanesBodyDto {  
  @ApiProperty({
    description: 'Airplane name',
    example: 'Boeing 737-800',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Number of seats',
    example: '168',
  })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  numberOfSeats: number;
}

export class AirplanesPatchDto {  
  @ApiProperty({
    description: 'Airplane name',
    example: 'Boeing 737-800',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Number of seats',
    example: '168',
  })
  @Type(() => Number)
  @IsInt()
  numberOfSeats: number;
}

export class AirplanesPostDeleteDto {
  @ApiProperty({
    description: 'Airplane ID',
    example: '63baf85381995926a14ff3f0',
  })
  id: number;
}