import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  FlightsBodyDto,
  FlightsDto,
  FlightsPatchDto,
  FlightsPostDeleteDto,
} from '../dto';
import { FlightsService } from './flights.service';

@ApiTags('Flights')
@Controller('flights')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  @ApiOkResponse({
    description: 'All flights.',
    type: FlightsDto,
    isArray: true,
  })
  @Get()
  async getFlights() {
    const flights = await this.flightsService.getFlights();
    return flights;
  }

  @ApiOkResponse({
    description: 'Single flight.',
    type: FlightsDto,
  })
  @ApiNotFoundResponse({
    description: 'Wrong flight ID.',
  })
  @Get(':id')
  async getFlight(@Param('id') id: string) {
    const flight = await this.flightsService.getFlight(id);
    return flight;
  }

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: FlightsPostDeleteDto,
  })
  @ApiBadRequestResponse({
    description: 'Wrong body.',
  })
  @Post()
  async postFlight(@Body() dto: FlightsBodyDto) {
    const generatedId = await this.flightsService.postFlight(dto);
    return { id: generatedId };
  }

  @ApiOkResponse({
    description: 'The record has been successfully modified.',
    type: FlightsDto,
  })
  @ApiNotFoundResponse({
    description: 'Wrong flight ID.',
  })
  @ApiBadRequestResponse({
    description: 'Wrong body.',
  })
  @Put(':id')
  async putFlight(@Param('id') id: string, @Body() dto: FlightsBodyDto) {
    const flight = await this.flightsService.putFlight(id, dto);
    return flight;
  }

  @ApiOkResponse({
    description: 'The record has been successfully modified.',
    type: FlightsDto,
  })
  @ApiNotFoundResponse({
    description: 'Wrong flight ID.',
  })
  @ApiBadRequestResponse({
    description: 'Wrong body.',
  })
  @Patch(':id')
  async patchFlight(@Param('id') id: string, @Body() dto: FlightsPatchDto) {
    const flight = await this.flightsService.patchFlight(id, dto);
    return flight;
  }

  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: FlightsPostDeleteDto,
  })
  @ApiNotFoundResponse({
    description: 'Wrong flight ID or record already deleted.',
  })
  @Delete(':id')
  async deleteFlight(@Param('id') id: string) {
    await this.flightsService.deleteFlight(id);
    return { id };
  }
}
