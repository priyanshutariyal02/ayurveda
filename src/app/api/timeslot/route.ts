// import { NextResponse } from "next/server";
// import { TimeSlot } from "@/models/timeslot.models";
// import mongoose from "mongoose";
// import dbConnect from "@/lib/db.connect";

import dbConnect from "@/lib/db.connect";
import { TimeSlot } from "@/models/timeslot.models";

// export async function GET() {
//   await dbConnect();

//   if (!mongoose.connection.db) {
//     console.error("Database connection is not established");
//     return NextResponse.json(
//       { message: "Database connection failed" },
//       { status: 500 }
//     );
//   }

//   try {
//     const slots = await mongoose.connection.db
//       .collection("slots")
//       .find({})
//       .toArray();

//     console.log("Fetched slots:", slots);

//     return NextResponse.json(slots, { status: 200 });
//   } catch (error) {
//     console.error("Failed to fetch time slots:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch time slots" },
//       { status: 500 }
//     );
//   }
// }

// // export async function PATCH (req: Request) {
// //     await dbConnect();

// //     try {
// //       const { time } = await req.json();

// //       const slot = await TimeSlot.findOneAndUpdate(
// //         { time },
// //         { booked: true },
// //         { new: true }
// //       );

// //       if (!slot) {
// //         return NextResponse.json(
// //           { message: "Time slot not found" },
// //           { status: 404 }
// //         );
// //       }

// //       return NextResponse.json(
// //         { message: "Time slot booked", slot },
// //         { status: 200 }
// //       );
// //     } catch (error) {
// //       console.error("Failed to book time slot:", error);
// //       return NextResponse.json(
// //         { message: "Failed to book time slot" },
// //         { status: 500 }
// //       );
// //     }
// //   }

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get("doctorId"); // Get doctorId from query params

  if (!doctorId) {
    return new Response("Doctor ID is required", { status: 400 });
  }

  try {
    await dbConnect();
    const timeSlots = await TimeSlot.find({ doctorId }); // Fetch time slots for the specified doctor
    return new Response(JSON.stringify(timeSlots), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch time slots:", error);
    return new Response("Failed to fetch time slots", { status: 500 });
  }
};
