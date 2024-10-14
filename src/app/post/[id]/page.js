"use client";

import BlogDetail from "../../components/BlogDetail"; // Adjust the path as needed
import useSWR from "swr";

// Fetcher function to fetch the data
const fetcher = (url) => fetch(url).then((res) => res.json());

const PostDetailPage = ({ params }) => {
  const { id } = params;

  // Use SWR to fetch the post data
  const { data: blog, error } = useSWR(`/api/posts/${id}`, fetcher);

  if (error) return <div>Failed to load post</div>;
  if (!blog) return <div>Loading...</div>;

  return <BlogDetail blog={blog} />;
};

export default PostDetailPage;
