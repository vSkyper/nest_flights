import mongoose from 'mongoose';

export const AirplaneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  numberOfSeats: { type: Number, required: true },
});

export class AirplaneModel extends mongoose.Document {
  id: string;
  name: string;
  numberOfSeats: number;
}
