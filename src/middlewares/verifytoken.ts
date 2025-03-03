import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_KEY as string;

export interface AuthenticatedUser {
  _id: string;
  email: string;
  role: string;
}

export function verifyToken(req: NextRequest): AuthenticatedUser | null {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    return {
      _id: decoded._id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    return null;
  }
}

export function isAdmin(user: AuthenticatedUser | null): boolean {
  return user?.role === "admin";
}

// import { NextRequest, NextResponse } from "next/server";
// import jwt, { JwtPayload } from "jsonwebtoken";

// // Extend NextRequest to include user info
// interface AuthenticatedRequest extends NextRequest {
//   user?: {
//     _id: string;
//     email: string;
//     role: string;
//   };
// }

// export const verifyToken = async (
//   req: AuthenticatedRequest,
//   res: NextResponse,
//   next: () => void
// ) => {
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.json(
//       { message: "You are unauthorized." },
//       { status: 401 }
//     );
//   }

//   jwt.verify(token, process.env.JWT_KEY as string, (err, data) => {
//     if (err || !data || typeof data === "string") {
//       return NextResponse.json(
//         { message: "You are unauthorized." },
//         { status: 401 }
//       );
//     }

//     req.user = {
//       _id: (data as JwtPayload)._id,
//       email: (data as JwtPayload).email,
//       role: (data as JwtPayload).role,
//     };

//     next();
//   });
// };

// export const isAdmin = async (
//   req: AuthenticatedRequest,
//   res: NextResponse,
//   next: () => void
// ) => {
//   try {
//     if (!req.user) {
//       return NextResponse.json(
//         { message: "User not authenticated" },
//         { status: 401 }
//       );
//     }

//     if (req.user.role !== "admin") {
//       return NextResponse.json(
//         { message: "Access denied. Admin only." },
//         { status: 403 }
//       );
//     }

//     next();
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Admin authorization failed" },
//       { status: 500 }
//     );
//   }
// };
