import dbConnect from "@/lib/db.connect";
import { TimeSlot } from "@/models/timeslot.models";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const { date, booked } = await req.json();

    const slot = await TimeSlot.findByIdAndUpdate(
      params.id,

      { date: date, booked: booked },
      { new: true }
    );

    if (!slot) {
      return NextResponse.json(
        { message: "Time slot not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Time slot booked", slot },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to book time slot:", error);
    return NextResponse.json(
      { message: "Failed to book time slot" },
      { status: 500 }
    );
  }
}
