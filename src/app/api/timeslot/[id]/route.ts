// import dbConnect from "@/lib/db.connect";
// import { TimeSlot } from "@/models/timeslot.models";
// import { NextRequest, NextResponse } from "next/server";

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   await dbConnect();

//   try {
//     const { date, dateKey, booked } = await req.json();

//     // Find the slot
//     const slot = await TimeSlot.findById(params.id);

//     if (!slot) {
//       return NextResponse.json(
//         { message: "Time slot not found" },
//         { status: 404 }
//       );
//     }

//     // Initialize bookedDates array if it doesn't exist
//     if (!slot.bookedDates) {
//       slot.bookedDates = [];
//     }

//     // Add the dateKey to bookedDates if booking is true and dateKey is not already in the array
//     if (booked && dateKey && !slot.bookedDates.includes(dateKey)) {
//       slot.bookedDates.push(dateKey);
//     }

//     // Save the updated slot
//     await slot.save();

//     return NextResponse.json(
//       { message: "Time slot updated", slot },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Failed to update time slot:", error);
//     return NextResponse.json(
//       { message: "Failed to update time slot" },
//       { status: 500 }
//     );
//   }
// }

import dbConnect from "@/lib/db.connect";
import { TimeSlot } from "@/models/timeslot.models";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    // Include doctorId in the destructured properties from request body
    const { date, dateKey, booked, doctorId } = await req.json();

    // Find the slot
    const slot = await TimeSlot.findById(params.id);

    if (!slot) {
      return NextResponse.json(
        { message: "Time slot not found" },
        { status: 404 }
      );
    }

    // Initialize bookedDates array if it doesn't exist
    if (!slot.bookedDates) {
      slot.bookedDates = [];
    }

    // Add the dateKey to bookedDates if booking is true and dateKey is not already in the array
    if (booked && dateKey && !slot.bookedDates.includes(dateKey)) {
      slot.bookedDates.push(dateKey);
    }

    // Ensure doctorId is set on the slot
    if (doctorId) {
      slot.doctorId = doctorId;
    }

    // Save the updated slot
    await slot.save();

    return NextResponse.json(
      { message: "Time slot updated", slot },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update time slot:", error);
    return NextResponse.json(
      { message: "Failed to update time slot", error: String(error) },
      { status: 500 }
    );
  }
}