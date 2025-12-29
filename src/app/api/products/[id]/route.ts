import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../db.json";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const productId = (await params).id;
  const product = db.products.find((p) => p.id === Number(productId));

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
