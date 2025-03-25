// import mongoose, { Schema, Document } from "mongoose";

// export interface ITimeSlot extends Document {
//   time: string;
//   booked: boolean;
//   bookedDates: string[]; // Array of date keys
// }

// const timeSlotSchema = new Schema<ITimeSlot>({
//   time: { type: String, required: true },
//   booked: { type: Boolean, default: false },
//   bookedDates: [{ type: String }], // Store date keys as strings
// });

// export const TimeSlot =
//   mongoose.models.Slot || mongoose.model<ITimeSlot>("Slot", timeSlotSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface ITimeSlot extends Document {
  time: string;
  booked: boolean;
  bookedDates: string[]; // Array of booked dates
  doctorId: string; // Associate slot with a doctor
}

const timeSlotSchema = new Schema<ITimeSlot>({
  time: { type: String, required: true },
  booked: { type: Boolean, default: false },
  bookedDates: [{ type: String }], // Store date keys as strings
  doctorId: { type: String, required: true }, // Associate time slot with doctor
});

export const TimeSlot =
  mongoose.models.Timeslot || mongoose.model<ITimeSlot>("Timeslot", timeSlotSchema);
