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
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AirplanesBodyDto, AirplanesDto, AirplanesPatchDto, AirplanesPostDeleteDto } from '../dto';
import { AirplanesService } from './airplanes.service';

@ApiTags('Airplanes')
@Controller('airplanes')
export class AirplanesController {
  constructor(private airplanesService: AirplanesService) {}

  @ApiOkResponse({
    description: 'All airplanes.',
    type: AirplanesDto,
    isArray: true,
  })
  @Get()
  async getAirplanes() {
    const airplanes = await this.airplanesService.getAirplanes();
    return airplanes;
  }

  @ApiOkResponse({
    description: 'Single airplane.',
    type: AirplanesDto,
  })
  @ApiNotFoundResponse({
    description: 'Wrong airplane ID.',
  })
  @Get(':id')
  async getAirplane(@Param('id') id: string) {
    const airplane = await this.airplanesService.getAirplane(id);
    return airplane;
  }

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: AirplanesPostDeleteDto,
  })
  @ApiBadRequestResponse({
    description: 'Wrong body.',
  })
  @Post()
  async postAirplane(@Body() dto: AirplanesBodyDto) {
    const generatedId = await this.airplanesService.postAirplane(dto);
    return { id: generatedId };
  }

  @ApiOkResponse({
    description: 'The record has been successfully modified.',
    type: AirplanesDto,
  })
  @ApiNotFoundResponse({
    description: 'Wrong airplane ID.',
  })
  @ApiBadRequestResponse({
    description: 'Wrong body.',
  })
  @Put(':id')
  async putAirplane(@Param('id') id: string, @Body() dto: AirplanesBodyDto) {
    const airplane = await this.airplanesService.putAirplane(id, dto);
    return airplane;
  }

  @ApiOkResponse({
    description: 'The record has been successfully modified.',
    type: AirplanesDto,
  })
  @ApiNotFoundResponse({
    description: 'Wrong airplane ID.',
  })
  @ApiBadRequestResponse({
    description: 'Wrong body.',
  })
  @Patch(':id')
  async patchAirplane(@Param('id') id: string, @Body() dto: AirplanesPatchDto) {
    const airplane = await this.airplanesService.patchAirplane(id, dto);
    return airplane;
  }

  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: AirplanesPostDeleteDto,
  })
  @ApiNotFoundResponse({
    description: 'Wrong airplane ID or record already deleted.',
  })
  @Delete(':id')
  async deleteAirplane(@Param('id') id: string) {
    await this.airplanesService.deleteAirplane(id);
    return { id };
  }
}
