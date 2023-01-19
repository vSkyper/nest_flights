import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirplanesController } from './airplanes/airplanes.controller';
import { AirplaneSchema } from './airplanes/airplanes.model';
import { AirplanesService } from './airplanes/airplanes.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Airplane', schema: AirplaneSchema}])],
  controllers: [AirplanesController],
  providers: [AirplanesService],
})
export class AirplanesModule {}
