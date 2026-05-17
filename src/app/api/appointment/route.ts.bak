// // File: app/api/appointment/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import { ObjectId } from "mongodb";

// export async function POST(request: NextRequest) {
//   try {
//     const appointmentData = await request.json();
//     const { name, email, phone, date, time, message, paymentId, slotId } = appointmentData;

//     // Validate required fields
//     if (!name || !email || !phone || !date || !time || !paymentId || !slotId) {
//       return NextResponse.json(
//         { error: "All required fields must be provided" },
//         { status: 400 }
//       );
//     }

//     const client = await connectToDatabase();
//     const db = client.db("appointment-system");
//     const appointmentsCollection = db.collection("appointments");

//     // Check if the slot is already booked
//     const timeslotsCollection = db.collection("timeslots");
//     const slot = await timeslotsCollection.findOne({ _id: new ObjectId(slotId) });
    
//     if (!slot) {
//       return NextResponse.json({ error: "Time slot not found" }, { status: 404 });
//     }
    
//     if (slot.booked) {
//       return NextResponse.json(
//         { error: "This time slot is already booked" },
//         { status: 400 }
//       );
//     }

//     // Create appointment
//     const result = await appointmentsCollection.insertOne({
//       name,
//       email,
//       phone,
//       date,
//       time,
//       message,
//       paymentId,
//       slotId,
//       status: "confirmed",
//       paymentStatus: "completed",
//       amount: 500, // 500 rupees
//       createdAt: new Date(),
//     });

//     return NextResponse.json(
//       { 
//         _id: result.insertedId,
//         name,
//         email,
//         date,
//         time,
//         status: "confirmed"
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating appointment:", error);
//     return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
//   }
// }

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const email = searchParams.get("email");

//     const client = await connectToDatabase();
//     const db = client.db("appointment-system");
//     const appointmentsCollection = db.collection("appointments");

//     let query = {};
//     if (email) {
//       query = { email };
//     }

//     const appointments = await appointmentsCollection.find(query).toArray();
//     return NextResponse.json(appointments);
//   } catch (error) {
//     console.error("Error fetching appointments:", error);
//     return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
//   }
// }