import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FlightsBodyDto, FlightsDto, FlightsPatchDto } from '../dto';
import { FlightModel } from './flights.model';

@Injectable()
export class FlightsService {
  constructor(
    @InjectModel('Flight') private readonly flightModel: Model<FlightModel>,
  ) {}

  async getFlights(): Promise<FlightsDto[]> {
    const flights = await this.flightModel.find().exec();
    return flights.map((flight) => ({
      id: flight.id,
      airplane: flight.airplane,
      origin: flight.origin,
      destination: flight.destination,
    }));
  }

  async getFlight(id: string): Promise<FlightsDto> {
    const flight = await this.findFlight(id);
    return {
      id: flight.id,
      airplane: flight.airplane,
      origin: flight.origin,
      destination: flight.destination,
    };
  }

  async postFlight(dto: FlightsBodyDto): Promise<string> {
    const newFlight = new this.flightModel({
      airplane: dto.airplane,
      origin: dto.origin,
      destination: dto.destination,
    });

    const result = await newFlight.save();
    return result.id;
  }

  async putFlight(id: string, dto: FlightsBodyDto): Promise<FlightsDto> {
    const flight = await this.findFlight(id);

    flight.airplane = dto.airplane;
    flight.origin = dto.origin;
    flight.destination = dto.destination;

    const result = await flight.save();
    return {
      id: result.id,
      airplane: result.airplane,
      origin: result.origin,
      destination: result.destination,
    };
  }

  async patchFlight(id: string, dto: FlightsPatchDto): Promise<FlightsDto> {
    const flight = await this.findFlight(id);

    if (dto.airplane) {
      flight.airplane = dto.airplane;
    }

    if (dto.origin) {
      flight.origin = dto.origin;
    }

    if (dto.destination) {
      flight.destination = dto.destination;
    }

    const result = await flight.save();
    return {
      id: result.id,
      airplane: result.airplane,
      origin: result.origin,
      destination: result.destination,
    };
  }

  async deleteFlight(id: string) {
    let result;
    try {
      result = await this.flightModel.deleteOne({ _id: id }).exec();
    } catch {
      throw new NotFoundException('Could not find flight.');
    }

    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find flight.');
    }
  }

  async findFlight(id: string): Promise<FlightModel> {
    let flight;
    try {
      flight = await this.flightModel.findById(id).exec();
    } catch {
      throw new NotFoundException('Could not find flight.');
    }

    if (!flight) {
      throw new NotFoundException('Could not find flight.');
    }

    return flight;
  }
}
