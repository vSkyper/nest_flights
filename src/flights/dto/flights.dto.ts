import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty, IsString } from 'class-validator';

export class FlightsDto {
  @ApiProperty({
    description: 'Flight ID',
    example: '63baf85381995926a14ff3f0',
  })
  id: string;

  @ApiProperty({
    description: 'Airplane name',
    example: 'Boeing 737-800',
  })
  airplane: string;

  @ApiProperty({
    description: 'Origin country',
    example: 'Paris',
  })
  origin: string;

  @ApiProperty({
    description: 'Destination country',
    example: 'Rome',
  })
  destination: string;
}

export class FlightsBodyDto {
  @ApiProperty({
    description: 'Airplane name',
    example: 'Boeing 737-800',
  })
  @IsString()
  @IsNotEmpty()
  airplane: string;

  @ApiProperty({
    description: 'Origin country',
    example: 'Paris',
  })
  @IsString()
  @IsNotEmpty()
  origin: string;

  @ApiProperty({
    description: 'Destination country',
    example: 'Rome',
  })
  @IsString()
  @IsNotEmpty()
  destination: string;
}

export class FlightsPatchDto {
  @ApiProperty({
    description: 'Airplane name',
    example: 'Boeing 737-800',
  })
  @IsString()
  airplane: string;

  @ApiProperty({
    description: 'Origin country',
    example: 'Paris',
  })
  @IsString()
  origin: string;

  @ApiProperty({
    description: 'Destination country',
    example: 'Rome',
  })
  @IsString()
  destination: string;
}

export class FlightsPostDeleteDto {
  @ApiProperty({
    description: 'Flight ID',
    example: '63baf85381995926a14ff3f0',
  })
  id: number;
}
