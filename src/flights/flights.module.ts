import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightsController } from './flights/flights.controller';
import { FlightSchema } from './flights/flights.model';
import { FlightsService } from './flights/flights.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Flight', schema: FlightSchema}])],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}
