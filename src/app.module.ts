import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirplanesModule } from './airplanes/airplanes.module';
import { FlightsModule } from './flights/flights.module';

require('dotenv').config()

@Module({
  imports: [FlightsModule, AirplanesModule, MongooseModule.forRoot(`mongodb+srv://${process.env.MongoDBLogin}:${process.env.MongoDBPassword}@flights.ymfubqu.mongodb.net/flight?retryWrites=true&w=majority`)],
})
export class AppModule {}
