import mongoose, { Schema, Document } from 'mongoose';

export interface ITimeSlot extends Document {
  date: Date;
  time: string;
  booked: boolean;
}

const timeSlotSchema = new Schema<ITimeSlot>({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  booked: { type: Boolean, default: false },
});

export const TimeSlot =
  mongoose.models.TimeSlot || mongoose.model<ITimeSlot>('Slot', timeSlotSchema);
