"use client";

import React from "react";
import useSWR from "swr"; // Import SWR
import BlogList from "./components/BlogList"; // Adjust the path based on your structure

// Fetcher function to fetch data
const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data: blog, error } = useSWR("/api/posts", fetcher); // Use SWR to fetch posts

  if (error) return <div>Failed to load posts</div>;
  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h1>Blog Posts</h1>
      <BlogList blog={blog} />
    </div>
  );
};

export default Home;
