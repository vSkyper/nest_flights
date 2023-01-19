import mongoose from 'mongoose';

export const FlightSchema = new mongoose.Schema({
  airplane: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
});

export class FlightModel extends mongoose.Document {
  id: string;
  airplane: string;
  origin: string;
  destination: string;
}
