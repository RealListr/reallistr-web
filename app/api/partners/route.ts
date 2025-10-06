import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json([
    { id:"fin-1", company:"Emerald Finance", vertical:"finance", geo:["DXB"] },
    { id:"ins-1", company:"Shield Insurance", vertical:"insurance", geo:["DXB"] },
  ]);
}
