import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest) {
  return NextResponse.json(
    {
      ping: "pong",
    },
    {
      status: 200,
    }
  );
}
