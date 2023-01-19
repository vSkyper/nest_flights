import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AirplanesBodyDto, AirplanesDto, AirplanesPatchDto } from '../dto';
import { AirplaneModel } from './airplanes.model';

@Injectable()
export class AirplanesService {
  constructor(
    @InjectModel('Airplane')
    private readonly airplaneModel: Model<AirplaneModel>,
  ) {}

  async getAirplanes(): Promise<AirplanesDto[]> {
    const airplanes = await this.airplaneModel.find().exec();
    return airplanes.map((airplane) => ({
      id: airplane.id,
      name: airplane.name,
      numberOfSeats: airplane.numberOfSeats,
    }));
  }

  async getAirplane(id: string): Promise<AirplanesDto> {
    const airplane = await this.findAirplane(id);
    return {
      id: airplane.id,
      name: airplane.name,
      numberOfSeats: airplane.numberOfSeats,
    };
  }

  async postAirplane(dto: AirplanesBodyDto): Promise<string> {
    const newAirplane = new this.airplaneModel({
      name: dto.name,
      numberOfSeats: dto.numberOfSeats,
    });

    const result = await newAirplane.save();
    return result.id;
  }

  async putAirplane(id: string, dto: AirplanesBodyDto): Promise<AirplanesDto> {
    const airplane = await this.findAirplane(id);

    airplane.name = dto.name;
    airplane.numberOfSeats = dto.numberOfSeats;

    const result = await airplane.save();
    return {
      id: result.id,
      name: result.name,
      numberOfSeats: result.numberOfSeats,
    };
  }

  async patchAirplane(
    id: string,
    dto: AirplanesPatchDto,
  ): Promise<AirplanesDto> {
    const airplane = await this.findAirplane(id);

    if (dto.name) {
      airplane.name = dto.name;
    }

    if (dto.numberOfSeats) {
      airplane.numberOfSeats = dto.numberOfSeats;
    }

    const result = await airplane.save();
    return {
      id: result.id,
      name: result.name,
      numberOfSeats: result.numberOfSeats,
    };
  }

  async deleteAirplane(id: string) {
    let result;
    try {
      result = await this.airplaneModel.deleteOne({ _id: id }).exec();
    } catch {
      throw new NotFoundException('Could not find airplane.');
    }

    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find airplane.');
    }
  }

  async findAirplane(id: string): Promise<AirplaneModel> {
    let airplane;
    try {
      airplane = await this.airplaneModel.findById(id).exec();
    } catch {
      throw new NotFoundException('Could not find airplane.');
    }

    if (!airplane) {
      throw new NotFoundException('Could not find airplane.');
    }

    return airplane;
  }
}
