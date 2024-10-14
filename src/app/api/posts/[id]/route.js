import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = global.prisma || new PrismaClient();
if (!global.prisma) {
  global.prisma = prisma;
}

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const body = await req.json();
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { ...body, date: new Date(body.date).toISOString() },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
