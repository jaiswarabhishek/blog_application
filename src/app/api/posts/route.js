// app/api/posts/route.js (or route.ts if using TypeScript)

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts); // Return posts as JSON
}

export async function POST(request) {
  const data = await request.json(); // Parse the incoming request data
  // Destructure and handle date conversion
  const { title, image, description, date } = data;

  // Convert the plain date string to an ISO string if using DateTime in Prisma
  const isoDate = new Date(date).toISOString();

  // Create a new post with the formatted data
  const newPost = await prisma.post.create({
    data: {
      title,
      image,
      description,
      date: isoDate, // Ensure date is in ISO format for DateTime
    },
  });
  

  return NextResponse.json(newPost, { status: 201 }); // Return the created post
}

