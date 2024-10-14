// app/api/posts/[id]/route.js
import { PrismaClient } from "@prisma/client";

// Reuse Prisma client to avoid connection issues in serverless environments
let prisma;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}
prisma = global.prisma;

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET error:", error);
    return new Response("Error fetching post", { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { ...body, date: new Date(body.date).toISOString() },
    });

    return new Response(JSON.stringify(updatedPost), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("PUT error:", error);
    return new Response("Error updating post", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response("Error deleting post", { status: 500 });
  }
}
