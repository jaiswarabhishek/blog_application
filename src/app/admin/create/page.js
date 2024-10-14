// app/admin/create/page.tsx
"use client"; // Ensure this page is treated as a Client Component

import BlogForm from "@/app/components/BlogForm";

export default function CreatePostPage() {
  return (
    <div>
      <h1>Create New Post</h1>
      <BlogForm />
    </div>
  );
}
