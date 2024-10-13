// app/api/posts/[id]/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
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
}

export async function PUT(req, { params }) {
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
}

export async function DELETE(req, { params }) {
  const { id } = params;

  await prisma.post.delete({
    where: { id: parseInt(id) },
  });

  return new Response(null, { status: 204 });
}
