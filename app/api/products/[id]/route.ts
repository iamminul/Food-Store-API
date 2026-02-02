import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//This is for GET individual product id request(api/products/1)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await requireAuth()
    const product = await prisma.product.findUnique({
      where: { id: Number.parseInt(params.id) },
    });
    if (!product) {
      return NextResponse.json(
        { error: "Product is not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

//This section is for DELETE prduct

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await requireAuth()
    await prisma.product.delete({
      where: { id: Number.parseInt(params.id) },
    });

    return NextResponse.json({ message: "Product is delete successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
      return NextResponse.json(
        { error: "Failed to delete product" },
        { status: 500 },
      );
  }
}


//This section is for update (PUT) product

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await requireAuth()
    const body = await request.json()
    const {title,description,price,category,brand,stock,thumbnail,images} = body
    const product = await prisma.product.update({
      where: { id: Number.parseInt(params.id) },
      data:{
        title,
        description,
        price:Number.parseFloat(price),
        category,
        brand,
        stock:Number.parseInt(stock),
        thumbnail,
        images,
      }
    });
    return NextResponse.json(product);

  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}
