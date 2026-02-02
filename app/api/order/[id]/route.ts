import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// for get order request
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await requireAdmin()
    const order = await prisma.order.findUnique({
      where: { id: Number.parseInt(params.id) },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    if (error instanceof Error && error.message === "Admin access denied") {
      return NextResponse.json({ error: "Admin access required" });
    }
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 },
    );
  }
}

// for put(update) request


export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await requireAdmin()
    const body = await request.json()
    const {status} = body


    const order = await prisma.order.update({
      where: { id: Number.parseInt(params.id) },
      data:{status},
        include:{
            user:{
                select:{
                    firstName:true,
                    lastName: true,
                    email: true,
                }
            },
            orderItems:{
                include:{
                    product:true,
                    
                }
            }
        }
      });
    return NextResponse.json(order);

  } catch (error) {
    console.error("Error updating order:", error);
    if (error instanceof Error && error.message === "Admin access denied") {
      return NextResponse.json({ error: "Admin access required" });
    }
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 },
    );
  }
}


//This section is for DELETE order

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await requireAdmin()
    await prisma.order.delete({
      where: { id: Number.parseInt(params.id) },
    });

    return NextResponse.json({ message: "Order delete successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    if (error instanceof Error && error.message === "Admin access required") {
      return NextResponse.json({ error: "Admin access required" }, { status: 401 });
    }
      return NextResponse.json(
        { error: "Failed to delete order" },
        { status: 500 },
      );
  }
}
